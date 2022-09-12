namespace MinderApi.Models
{
    public class Message
    {
        public int MessageId { get; set; }
        public string Text { get; set; }
        public int RoomId { get; set; }
        public int CustomerId { get; set; }
    }
}
