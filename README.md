# ✈️ FlexBooking - Uçak Bileti Satış ve Rezervasyon Sistemi  

### 📌 Proje Açıklaması  
FlexBooking Seyahat Acentesi için geliştirilen bu **uçak bileti satış ve rezervasyon yönetim sistemi**, müşteri taleplerini hızlı karşılamak, çalışan performansını takip etmek ve kullanıcı dostu bir arayüz sunmak amacıyla oluşturulmuştur.  

Sistem; **bilet satış, rezervasyon takibi, kampanya yönetimi ve gelişmiş arama ** gibi temel modülleri içerir.  

---

## 📌 **Özellikler**
### **1️⃣ Bilet Satış Modülü**
✅ Kullanıcıların **tarih, kalkış-varış noktası, havayolu firması bilgilerine göre bilet araması yapabilmesi.**  
✅ Havayolu firmalarının sistemleriyle **entegrasyon sağlayarak güncel fiyat ve mevcudiyet bilgilerini alabilme.**  
✅ **Koltuk seçimi** ile yolcuların istedikleri yeri rezerve edebilmesi.   

### **2️⃣ Performans ve Rezervasyon Takip Modülü**  
✅ Acente çalışanlarının performansını gösteren **aylık rapor:**  
   - Toplam rezervasyon sayısı  
   - İptal edilen rezervasyon sayısı  
   - Gerçekleştirilen müşteri sayısı  
   - Aylık toplam satış miktarı  
   - Son rezervasyon tarihi  
✅ **Rezervasyonların durumlarını takip edebilme** (Aktif, İptal, Tamamlandı vb.)  

### **3️⃣ Kampanyalar Modülü**  
✅ Mevcut ve gelecekteki kampanyaların **listelenmesi ve yönetilmesi.**  

### **4️⃣ Gelişmiş Arama ve Filtreleme Modülü**  
✅ Kullanıcılar için kolay bilet arama:  
   - **Kalkış ve varış noktası seçimi**  
   - **Fiyat aralığı filtreleme**  
   - **Fiyat sıralaması** (En düşük / En yüksek fiyat)  

### **5️⃣ Ödeme Modülü**  
✅ **Yolcu bilgileri doğrulama ve fatura bilgileri girme.**  

---

## 📸 **Ekran Görüntüleri**  

### **🖥️ Anasayfa**  
![Anasayfa](https://github.com/user-attachments/assets/820c6185-a47e-458c-9529-62d557d8e14b)  
📌 **Anasayfa**, kullanıcıların bilet arayabileceği, kampanyaları görebileceği ve uçuş detaylarına ulaşabileceği bölümdür. Kullanıcılar, kalkış-varış noktalarını seçerek arama yapabilir ve bilet fiyatlarını karşılaştırabilir.  

### **🪑 Koltuk Seçme Sayfası**  
![Koltuk Seçme](./screenshots/seat_selection.png)  
📌 **Koltuk Seçme Sayfası**, uçuşunu seçen yolcuların uygun koltukları görüntüleyerek rezervasyon yapabileceği bölümdür. **Mevcut ve rezerve edilmiş koltuklar farklı renklerle gösterilir.** Kullanıcı seçimini yaparak ödeme adımına geçebilir.  

---

## 🔧 **Teknolojiler ve Kullanılan Araçlar**
- **Frontend:** React.js, Redux, Bootstrap  
- **Backend:** Node.js, Express.js, .NET Core  
- **Database:** PostgreSQL, MongoDB  
- **Ödeme Sistemi:** Stripe API, Iyzico  
- **Diğer Araçlar:** Git, GitHub Actions, Docker, Jest (Test)  

---



