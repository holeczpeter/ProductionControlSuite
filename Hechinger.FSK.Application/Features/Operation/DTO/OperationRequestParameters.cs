﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hechinger.FSK.Application.Features
{
    public class OperationRequestParameters : RequestParameters
    {
        public string ProductName { get; set; }

        public string ProductCode { get; set; }
    }
}