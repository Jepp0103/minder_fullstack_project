using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;


namespace MinderApi.HubConfig
{
    public class MyHub : Hub
    {
        public async Task receiveClientMessage(string message)
        {

            await Clients.Caller.SendAsync("serverResponse", message);
        }

        public async Task userOn(string newUser) {
            await Clients.Others.SendAsync("userOn", newUser);
        }
    }
}
