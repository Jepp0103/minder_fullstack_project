using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using System.Data;
using Microsoft.AspNetCore.Mvc;
using MinderApi.Models;
using MinderApi.Models.Database;

namespace MinderApi.HubConfig
{
    public class ChatHub : Hub
    {
        MusicDatabaseEFContext musicDbContext;
        public ChatHub(MusicDatabaseEFContext mDbContext) {
            musicDbContext = mDbContext;
        }

        public async Task AddToRoom(string userId, string userName, string roomId) {   
            try{
                //var 
                
                Room room = new Room();
                musicDbContext.Add(room); 

                var lastInsertedRoomId = room.RoomId;
                CustomerRoom customerRoom = new CustomerRoom() {
                    RoomId = lastInsertedRoomId,
                    CustomerId = int.Parse(userId)  
                };
                musicDbContext.Add(customerRoom);

                musicDbContext.SaveChanges();

                await Groups.AddToGroupAsync(Context.ConnectionId, roomId);
                await Clients.Group(roomId).SendAsync("roomJoin", $"{userName} has joined the group {roomId}.");
            } catch (Exception ex) {
                System.Diagnostics.Debug.WriteLine(ex);
            }
        }

        public async Task RemoveFromRoom(string groupName) {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            await Clients.Group(groupName).SendAsync("roomJoin", $"{Context.ConnectionId} has left the group {groupName}.");
        }

        public async Task SendMessage(string userName, string message) {
            await Clients.Group("1").SendAsync(
                "messageResponse",
                userName,
                message
            );
        }
    }
}
