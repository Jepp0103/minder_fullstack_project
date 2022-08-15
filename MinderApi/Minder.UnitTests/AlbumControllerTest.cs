using MinderApi.Controllers;
using Xunit;
using MinderApi.Models;
using System.Text.Json;


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
            var testObject = albumController.SearchAlbums("Pure Cult: The ").FirstOrDefault();
            var actual = testObject.GetType().GetProperty("Title").GetValue(testObject);

            //Assert
            Assert.Equal(expected, actual);
        }
    }
}