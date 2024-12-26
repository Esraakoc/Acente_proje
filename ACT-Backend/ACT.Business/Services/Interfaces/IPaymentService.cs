﻿using ACT.Business.DTO;
using ACT.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ACT.Business.Services.Interfaces
{
    public interface IPaymentService
    {
        Task<IEnumerable<ActPayment>> GetPaymentsAsync();
        Task<ActPayment> CreatePaymentAsync(AddToPaymentDto paymentDto);
        Task<bool> DeletePaymentAsync(int paymentId);
    }
}
