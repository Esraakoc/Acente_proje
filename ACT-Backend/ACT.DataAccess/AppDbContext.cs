﻿using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using ACT.Entity.Models;
using Microsoft.Extensions.Configuration;

namespace ACT.DataAccess
{
    public partial class AppDbContext : DbContext
    {
        public AppDbContext()
        {
        }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<ActCampaign> ActCampaigns { get; set; }

        public virtual DbSet<ActCart> ActCarts { get; set; }

        public virtual DbSet<ActCustomer> ActCustomers { get; set; }

        public virtual DbSet<ActFlight> ActFlights { get; set; }

        public virtual DbSet<ActPayment> ActPayments { get; set; }

        public virtual DbSet<ActPaymentStatus> ActPaymentStatuses { get; set; }

        public virtual DbSet<ActReservation> ActReservations { get; set; }

        public virtual DbSet<ActReservationStatus> ActReservationStatuses { get; set; }

        public virtual DbSet<ActUser> ActUsers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var configuration = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json")
                    .Build();

                string connectionString = configuration.GetConnectionString("DefaultConnection");
                optionsBuilder.UseSqlServer(connectionString);
            }     
        }
           

   

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ActCampaign>(entity =>
            {
                entity.HasKey(e => e.CampaignId).HasName("PK__ACT_Camp__5447BD4EE3C87B89");

                entity.ToTable("ACT_Campaigns");

                entity.Property(e => e.CampaignId).HasColumnName("campaignId");
                entity.Property(e => e.Description).HasColumnName("description");
                entity.Property(e => e.DiscountPercentage)
                    .HasColumnType("decimal(5, 2)")
                    .HasColumnName("discountPercentage");
                entity.Property(e => e.EndDate)
                    .HasColumnType("datetime")
                    .HasColumnName("endDate");
                entity.Property(e => e.StartDate)
                    .HasColumnType("datetime")
                    .HasColumnName("startDate");
                entity.Property(e => e.Title)
                    .HasMaxLength(100)
                    .HasColumnName("title");
            });

            modelBuilder.Entity<ActCart>(entity =>
            {
                entity.HasKey(e => e.CartId).HasName("PK__ACT_Cart__415B03B8A243F927");

                entity.ToTable("ACT_Cart");

                entity.Property(e => e.CartId).HasColumnName("cartId");
                entity.Property(e => e.AddedAt)
                    .HasDefaultValueSql("(getdate())")
                    .HasColumnType("datetime")
                    .HasColumnName("addedAt");
                entity.Property(e => e.FlightId).HasColumnName("flightId");
                entity.Property(e => e.Quantity).HasColumnName("quantity");
                entity.Property(e => e.UserId)
                    .HasMaxLength(15)
                    .HasColumnName("userId");


                entity.HasOne(d => d.Flight).WithMany(p => p.ActCarts)
                    .HasForeignKey(d => d.FlightId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ACT_Cart_Flight");

                entity.HasOne(d => d.User).WithMany(p => p.ActCarts)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ACT_Cart_User");
            });

            modelBuilder.Entity<ActCustomer>(entity =>
            {
                entity.HasKey(e => e.CustomerId).HasName("PK__ACT_Cust__B611CB7D0B9CC2AE");

                entity.ToTable("ACT_Customers");

                entity.HasIndex(e => e.Email, "UQ__ACT_Cust__AB6E6164027F8F91").IsUnique();

                entity.Property(e => e.CustomerId).HasColumnName("customerId");
                entity.Property(e => e.Address)
                    .HasMaxLength(255)
                    .HasColumnName("address");
                entity.Property(e => e.CustomerName)
                    .HasMaxLength(30)
                    .HasColumnName("customerName");
                entity.Property(e => e.CustomerSurname)
                    .HasMaxLength(30)
                    .HasColumnName("customerSurname");
                entity.Property(e => e.DateOfBirth).HasColumnName("dateOfBirth");
                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .HasColumnName("email");
                entity.Property(e => e.Phone)
                    .HasMaxLength(15)
                    .HasColumnName("phone");
            });

            modelBuilder.Entity<ActFlight>(entity =>
            {
                entity.HasKey(e => e.FlightId).HasName("PK__ACT_Flig__0E018642B3E53CFB");

                entity.ToTable("ACT_Flights");

                entity.Property(e => e.FlightId).HasColumnName("flightId");
                entity.Property(e => e.ArrivalDate)
                    .HasColumnType("datetime")
                    .HasColumnName("arrivalDate");
                entity.Property(e => e.ArrivalLocation)
                    .HasMaxLength(100)
                    .HasColumnName("arrivalLocation");
                entity.Property(e => e.AvailableSeats).HasColumnName("availableSeats");
                entity.Property(e => e.CreatedDate)
                    .HasDefaultValueSql("(getdate())")
                    .HasColumnType("datetime")
                    .HasColumnName("createdDate");
                entity.Property(e => e.DepartureDate)
                    .HasColumnType("datetime")
                    .HasColumnName("departureDate");
                entity.Property(e => e.DepartureLocation)
                    .HasMaxLength(100)
                    .HasColumnName("departureLocation");
                entity.Property(e => e.FlightCode)
                    .HasMaxLength(20)
                    .HasColumnName("flightCode");
                entity.Property(e => e.Price)
                    .HasColumnType("decimal(10, 2)")
                    .HasColumnName("price");
                entity.Property(e => e.UpdateAt)
                    .HasColumnType("datetime")
                    .HasColumnName("updateAt");
                entity.Property(e => e.Airline)
                  .HasMaxLength(100)
                  .HasColumnName("airline");
            });

            modelBuilder.Entity<ActPayment>(entity =>
            {
                entity.HasKey(e => e.PaymentId).HasName("PK__ACT_Paym__A0D9EFC6979A82AD");

                entity.ToTable("ACT_Payments");

                entity.Property(e => e.PaymentId).HasColumnName("paymentId");
                entity.Property(e => e.CustomerId).HasColumnName("customerId");
                entity.Property(e => e.PaymentAmount)
                    .HasColumnType("decimal(10, 2)")
                    .HasColumnName("paymentAmount");
                entity.Property(e => e.PaymentDate)
                    .HasDefaultValueSql("(getdate())")
                    .HasColumnType("datetime")
                    .HasColumnName("paymentDate");
                entity.Property(e => e.PaymentStatus).HasColumnName("paymentStatus");
                entity.Property(e => e.UserId)
                    .HasMaxLength(15)
                    .HasColumnName("userId");
                entity.Property(e => e.CreditCardNo)
                      .HasMaxLength(30)
                      .HasColumnName("creditCardNo"); 
                entity.Property(e => e.CVV)
                      .HasMaxLength(5)
                      .HasColumnName("cvv");
                entity.Property(e => e.ExpiryDate)
                      .HasMaxLength(7)
                      .HasColumnName("expiryDate"); 

                entity.HasOne(d => d.PaymentStatusNavigation).WithMany(p => p.ActPayments)
                    .HasForeignKey(d => d.PaymentStatus)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ACT_Payments_PaymentStatus");


                entity.HasOne(d => d.Customer).WithMany(p => p.ActPayments)
                    .HasForeignKey(d => d.CustomerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ACT_Payments_Customer");


                entity.HasOne(d => d.User).WithMany(p => p.ActPayments)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ACT_Payments_User");
            });

            modelBuilder.Entity<ActPaymentStatus>(entity =>
            {
                entity.HasKey(e => e.PaymentStatusId).HasName("PK__ACT_Paym__D000CD8BD2AE75AA");

                entity.ToTable("ACT_PaymentStatus");

                entity.Property(e => e.PaymentStatusId).HasColumnName("paymentStatusId");
                entity.Property(e => e.StatusName)
                    .HasMaxLength(30)
                    .HasColumnName("statusName");
            });

            modelBuilder.Entity<ActReservation>(entity =>
            {
                entity.HasKey(e => e.ReservationId).HasName("PK__ACT_Rese__B14BF5C5C1EA2F6D");

                entity.ToTable("ACT_Reservations");

                entity.Property(e => e.ReservationId).HasColumnName("reservationId");
                entity.Property(e => e.CustomerId).HasColumnName("customerId");
                entity.Property(e => e.PaymentId).HasColumnName("paymentId");
                entity.Property(e => e.FlightId).HasColumnName("flightId");
                entity.Property(e => e.ReservationDate)
                    .HasColumnType("datetime")
                    .HasColumnName("reservationDate");
                entity.Property(e => e.Status).HasColumnName("status");
                entity.Property(e => e.TotalAmount)
                    .HasColumnType("decimal(10, 2)")
                    .HasColumnName("totalAmount");
                entity.Property(e => e.UpdateDate)
                    .HasColumnType("datetime")
                    .HasColumnName("updateDate");
                entity.Property(e => e.UserId)
                    .HasMaxLength(15)
                    .HasColumnName("userId");
                entity.Property(e => e.Seat)
                   .HasMaxLength(5)
                   .HasColumnName("seat");

                entity.HasOne(d => d.Customer).WithMany(p => p.ActReservations)
                    .HasForeignKey(d => d.CustomerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ACT_Reservations_Customer");

                entity.HasOne(e => e.Payment).WithMany(p => p.ActReservations)
                   .HasForeignKey(e => e.PaymentId)
                   .OnDelete(DeleteBehavior.ClientSetNull)
                   .HasConstraintName("FK_ACT_Reservations_Payment")
                   .IsRequired(false); 

                entity.HasOne(d => d.Flight).WithMany(p => p.ActReservations)
                    .HasForeignKey(d => d.FlightId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ACT_Reservations_Flight");

                entity.HasOne(d => d.StatusNavigation).WithMany(p => p.ActReservations)
                    .HasForeignKey(d => d.Status)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ACT_Reservations_Status");

                entity.HasOne(d => d.User).WithMany(p => p.ActReservations)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ACT_Reservations_User");
            });

            modelBuilder.Entity<ActReservationStatus>(entity =>
            {
                entity.HasKey(e => e.ReservationStatusId).HasName("PK__ACT_Rese__C35187929E38B920");

                entity.ToTable("ACT_ReservationStatus");

                entity.Property(e => e.ReservationStatusId).HasColumnName("reservationStatusId");
                entity.Property(e => e.StatusName)
                    .HasMaxLength(30)
                    .HasColumnName("statusName");
            });

            modelBuilder.Entity<ActUser>(entity =>
            {
                entity.HasKey(e => e.UserId).HasName("PK__ACT_User__CB9A1CFF525C5016");

                entity.ToTable("ACT_Users");
                 
                entity.HasIndex(e => e.Email, "UQ__ACT_User__AB6E61648AAC061E").IsUnique();

                entity.Property(e => e.UserId)
                    .HasMaxLength(15)
                    .HasColumnName("userId");
                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .HasColumnName("email");
                entity.Property(e => e.FirstName)
                    .HasMaxLength(30)
                    .HasColumnName("firstName");
                entity.Property(e => e.LastName)
                    .HasMaxLength(30)
                    .HasColumnName("lastName");
                entity.Property(e => e.Password)
                    .HasMaxLength(255)
                    .HasColumnName("password");
                entity.Property(e => e.Phone)
                    .HasMaxLength(15)
                    .HasColumnName("phone");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}


