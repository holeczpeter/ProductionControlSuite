namespace Hechinger.FSK.Application.Common.Models
{
    public class IntervalModel : BaseModel
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int DifferenceInCalendarDays { get; set; }
        public Views SelectedView { get; set; }
        public int CurrentYear { get; set; }
        public int CurrentMonth { get; set; }
        public string CurrentMonthName { get; set; }
        public int CurrentWeek { get; set; }

    }
}
