namespace CarParkSG.Models.ViewModel
{
    public class CarParkDataModelView
    {
        public string carParkDetail { get; set; }  
        public List<string> short_term_parking { get; set; }   
        public List<string> car_park_type { get; set; }
        public List<string> free_parking{ get; set; }
        public List<string> gantry_height  { get; set; }
        public List<string> car_park_basement { get; set;}
        public List<string> night_parking { get; set; }
    }
}
