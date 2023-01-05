namespace Hechinger.FSK.Application.Features
{
    public class ParameterResult<T> : BaseModel
    {
        public int Count { get; set; }

        public IEnumerable<T> Result { get; set; }
    }
}
