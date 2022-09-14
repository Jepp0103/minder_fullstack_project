using Xunit;
using MinderApi.Hubs;
using System.Text.Json;

namespace Minder.UnitTests
{
    public class ChatHubTest
    {
        [Fact]
        public void TestValidateTwoUsersInARoom()
        {
            //Arrange
            var musicDbContext = TestSetup.SetupTestDbContext();
            ChatHub chatHub = new ChatHub(musicDbContext);

            // Act  
            bool expected = true;
            bool actual = chatHub.ValidateTwoUsersInARoom(77, 69);

            //Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void TestGetRoomByTwoUsers()
        {
            //Arrange
            var musicDbContext = TestSetup.SetupTestDbContext();
            ChatHub chatHub = new ChatHub(musicDbContext);

            // Act  
            string expected = "1";
            string actual = chatHub.GetRoomIdByTwoUsers(77, 69);

            //Assert
            Assert.Equal(expected, actual);
        }
    }
}
