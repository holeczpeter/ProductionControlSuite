namespace ProductionControlSuite.FSK.Application.Common.Builders
{

    public class ResultBuilder<T>
    {
        private readonly Result<T> result;
        public ResultBuilder()
        {
            this.result = new Result<T>();
        }
        public ResultBuilder<T> SetIsSuccess(bool isSuccess)
        {
            this.result.IsSuccess = isSuccess;
            return this;
        }
        public ResultBuilder<T> SetMessage(string message)
        {
            result.Message = message;
            return this;
        }
        public ResultBuilder<T> AddError(string error)
        {
            if (!this.result.Errors.Any()) result.Errors = new List<string>();
            this.result.Errors.Add(error);
            return this;
        }
        public Result<T> Build() => this.result;
    }
}
