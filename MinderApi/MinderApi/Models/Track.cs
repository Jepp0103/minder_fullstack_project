namespace MinderApi.Models
{
    public class Track { 
    
        public string? Name { get; set; }
        public string? Composer { get; set; }        
        public int MediaTypeId { get; set; }
        public int MilliSeconds { get; set; }
        public int UnitPrice { get; set; }

    }
}
