namespace ProductionControlSuite.FSK.Application.Features
{
    //TODO: HP: Kitalálni és implementálni
    public class ForgotPasswordHandler : IRequestHandler<ForgotPassword, Result<bool>>
    {
        private readonly FSKDbContext context;
        public ForgotPasswordHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Result<bool>> Handle(ForgotPassword request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("unsuccessfulSave").SetIsSuccess(false).Build();


            result.IsSuccess = true;
            result.Message = "A jelszó változtatás sikeres";

            return result;
        }
    }
}
