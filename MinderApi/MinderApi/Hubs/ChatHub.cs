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
            var roomUsersCount = (from r in musicDbContext.Room
                                  join cr1 in musicDbContext.Customer_Room on r.RoomId equals cr1.RoomId
                                  join cr2 in musicDbContext.Customer_Room on r.RoomId equals cr2.RoomId
                                  where cr1.CustomerId == userId && cr2.CustomerId == matchId
                                  select r).Count();

            bool isTwoUsers = roomUsersCount == 1 ? true : false;
            return isTwoUsers;
        }
        
        public string AddRoom(int userId, int matchId) {
            try {
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
            } catch (Exception e) {
                return $"Error adding room: {e}";
            }
    
        }

        public string AddMessage(string text, int roomId, int customerId) {
            try {
                Message message = new Message() {
                    Text = text,
                    RoomId = roomId,
                    CustomerId = customerId
                };

                musicDbContext.Add(message);
                musicDbContext.SaveChanges();
                var insertedMessage= musicDbContext.Message.Where(message => message.MessageId == message.MessageId).FirstOrDefault().ToString();
                return insertedMessage;
            } catch (Exception e) {
                return $"Error adding message: {e}";
            };
        }

        public string GetRoomIdByTwoUsers(int userId, int matchId) {
            string roomId = (from r in musicDbContext.Room
                                  join cr1 in musicDbContext.Customer_Room on r.RoomId equals cr1.RoomId
                                  join cr2 in musicDbContext.Customer_Room on r.RoomId equals cr2.RoomId
                                  where cr1.CustomerId == userId && cr2.CustomerId == matchId
                                  select r).FirstOrDefault().RoomId.ToString();
            return roomId;
        }

        public async Task ConnectToRoom(int userId, int matchId) {   
            try{
                string roomId = "";

                if (!ValidateTwoUsersInARoom(userId, matchId)) {
                    roomId = AddRoom(userId, matchId);
                } else {
                    roomId = GetRoomIdByTwoUsers(userId, matchId);
                }

                await Groups.AddToGroupAsync(Context.ConnectionId, roomId);
                await Clients.Group(roomId).SendAsync("roomJoin", roomId);
            } catch (Exception ex) {
                System.Diagnostics.Debug.WriteLine(ex);
            }
        }

        public async Task RemoveFromRoom(string roomId) {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomId);
            await Clients.Group(roomId).SendAsync("roomJoin", $"{Context.ConnectionId} has left the group {roomId}.");
        }

        public async Task SendMessage(string userName, string customerId, string message, string roomId) {

            string messageResponseRoom = "messageResponse" + roomId;
            await Clients.Group(roomId).SendAsync(
                messageResponseRoom,
                userName,
                message
            );
            
            //Storing message in db
            AddMessage(message, int.Parse(roomId), int.Parse(customerId));
        }
    }
}
