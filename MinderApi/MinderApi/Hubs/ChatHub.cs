using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using System.Data;
using Microsoft.AspNetCore.Mvc;
using MinderApi.Models;
using MinderApi.Models.Database;

namespace MinderApi.Hubs
{
    public class ChatHub : Hub
    {
        MusicDatabaseEFContext musicDbContext;
        public ChatHub(MusicDatabaseEFContext mDbContext) {
            musicDbContext = mDbContext;
        }

        public bool ValidateTwoUsersInARoom(int userId, int matchId)
        {
            var chosenIds = new int[]{userId, matchId};
            var roomUsersCount = (from r in musicDbContext.Room
                                  join cr in musicDbContext.Customer_Room on r.RoomId equals cr.RoomId
                                  where chosenIds.Contains(cr.CustomerId)
                                  select r).Count();
                
            bool isTwoUsers = roomUsersCount == 2 ? true : false;
            return isTwoUsers;
        }
        
        public string AddRoom(int userId, int matchId) {
            Room room = new Room();
            musicDbContext.Add(room);
            musicDbContext.SaveChanges();

            var lastInsertedRoomId = room.RoomId;
            CustomerRoom userCustomerRoom = new CustomerRoom()
            {
                RoomId = lastInsertedRoomId,
                CustomerId = userId
            };

            CustomerRoom matchCustomerRoom = new CustomerRoom()
            {
                RoomId = lastInsertedRoomId,
                CustomerId = matchId
            };

            musicDbContext.Add(userCustomerRoom);
            musicDbContext.Add(matchCustomerRoom);
            musicDbContext.SaveChanges();
            var insertedRoomId = musicDbContext.Room.Where(room => room.RoomId == room.RoomId).FirstOrDefault().RoomId.ToString();
            return insertedRoomId;
        }

        public string GetRoomByRoomUsers(int userId, int matchId, string roomId) {
            var chosenIds = new int[] { userId, matchId };
            roomId = (from r in musicDbContext.Room
                      join cr in musicDbContext.Customer_Room on r.RoomId equals cr.RoomId
                      where chosenIds.Contains(cr.CustomerId)
                      select r).FirstOrDefault().RoomId.ToString();
            return roomId;
        }

        public async Task ConnectToRoom(int userId, int matchId) {   
            try{
                string roomId = "";

                if (!ValidateTwoUsersInARoom(userId, matchId)) {
                    roomId = AddRoom(userId, matchId);
                } else {
                    roomId = GetRoomByRoomUsers(userId, matchId, roomId);
                }

                await Groups.AddToGroupAsync(Context.ConnectionId, roomId);
                await Clients.Group(roomId).SendAsync("roomJoin", roomId);
            } catch (Exception ex) {
                System.Diagnostics.Debug.WriteLine(ex);
            }
        }

        public async Task RemoveFromRoom(string groupName) {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            await Clients.Group(groupName).SendAsync("roomJoin", $"{Context.ConnectionId} has left the group {groupName}.");
        }

        public async Task SendMessage(string userName, string message, string roomId) {
            await Clients.Group(roomId).SendAsync(
                "messageResponse",
                userName,
                message
            );
        }
    }
}
