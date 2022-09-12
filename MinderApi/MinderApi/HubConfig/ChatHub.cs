using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;


namespace MinderApi.HubConfig
{
    public class ChatHub : Hub
    {
        public async Task AddToGroup(string userName, string groupName)
        {
            System.Diagnostics.Debug.WriteLine("groupName: " + groupName);
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            await Clients.Group(groupName).SendAsync("groupJoin", $"{userName} has joined the group {groupName}.");
        }

        public async Task RemoveFromGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            await Clients.Group(groupName).SendAsync("groupJoin", $"{Context.ConnectionId} has left the group {groupName}.");
        }

        public async Task SendMessage(string userName, string message)
        {

            //await Clients.Caller.SendAsync("messageResponse", Context.ConnectionId, message);
            await Clients.Group("testGroup").SendAsync(
                "messageResponse",
                userName,
                message
            );
        }

        public async Task userOn(string groupName) {
            await Clients.Group(groupName).SendAsync("userResponse", $"{Context.ConnectionId}");
        }
    }
}
