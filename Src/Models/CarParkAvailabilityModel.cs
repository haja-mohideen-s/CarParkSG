namespace CarParkSG.Models
{
    // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);
    public class CarparkInfo
    {
        public string total_lots { get; set; }
        public string lot_type { get; set; }
        public int lots_available { get; set; }
    }

    public class CarparkData
    {
        public List<CarparkInfo> carpark_info { get; set; }
        public string carpark_number { get; set; }
        public DateTime update_datetime { get; set; }
    }

    public class Item
    {
        public DateTime timestamp { get; set; }
        public List<CarparkData> carpark_data { get; set; }
    }

    public class CarParkAvailabilityModel
    {
        public List<Item> items { get; set; }
    }


}
