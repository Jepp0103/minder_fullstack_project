namespace MinderApi.Models
{
    public class Track { 
    
        public int TrackId { get; set; }
        public string? Name { get; set; }
        public string? Composer { get; set; }
        public int AlbumId { get; set; }
        public int MediaTypeId { get; set; }
        public int GenreId { get; set; }
        public int MilliSeconds { get; set; }
        public int Bytes { get; set; }
        public double UnitPrice { get; set; }

    }
}
