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
            var actual = chatHub.ValidateTwoUsersInARoom(77, 68);

            //Assert
            Assert.Equal(expected, actual);
        }
    }
}
