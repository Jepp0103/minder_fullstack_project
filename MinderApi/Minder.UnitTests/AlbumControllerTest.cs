using MinderApi.Controllers;
using Xunit;

namespace Minder.UnitTests
{
    public class AlbumControllerTest
    {
        [Fact]
        public void TestGetAlbumById()
        {
            //Arrange
            var musicDbContext = TestSetup.SetupTestDbContext();
            AlbumController albumController = new AlbumController(musicDbContext);

            // Act  
            string expected = "Let There Be Rock";
            var actual = albumController.GetAlbumById(4).First().Title;

            //Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void TestSearchAlbums()
        {
            //Arrange
            var musicDbContext = TestSetup.SetupTestDbContext();
            AlbumController albumController = new AlbumController(musicDbContext);

            // Act  
            string expected = "Pure Cult: The Best Of The Cult (For Rockers, Ravers, Lovers & Sinners) [UK]";
            var actual = albumController.SearchAlbums("Pure Cult: The ").First().Title;

            //Assert
            Assert.Equal(expected, actual);
        }
    }
}