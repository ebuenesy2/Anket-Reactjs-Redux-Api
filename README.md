# 📊 React + Redux + API Entegrasyonu ile Anket Projesi

Bu proje, kullanıcıların anket oluşturmasını, oylamasını ve sonuçlarını görüntülemesini sağlayan bir **React** tabanlı web uygulamasıdır. Kullanıcı durumu **Redux** ile yönetilir ve backend API'sinden veri alınarak dinamik bir sistem sunulur.

## 🚀 Başlarken

### 1. Gerekli Bağımlılıkların Kurulumu
Proje bağımlılıklarını yüklemek için:
```bash
npm install
```

### 2. Çevresel Değişkenlerin Ayarlanması
API adresini ayarlamak için bir `.env` dosyası oluşturun:
```
REACT_APP_API_URL=http://your-api-endpoint.com
```

### 3. Uygulamayı Çalıştırma
Geliştirme ortamında projeyi çalıştırmak için:
```bash
npm start
```

Proje varsayılan olarak şu adreste çalışır:
```
http://localhost:3000/
```

### 4. Derleme
Üretim ortamı için projeyi derlemek için:
```bash
npm run build
```

## 🎯 Özellikler

- **Kullanıcı Girişi**: Kullanıcı oturum açma ve çıkış işlemleri.
- **Anket Listeleme**: Tüm mevcut anketlerin görüntülenmesi.
- **Anket Sonuçları**: Katılımcıların oy dağılımını görme.
- **Anket Oy Verme**: Kullanıcıların oylama yapması.
- **Anket Oluşturma**: Yeni anket ekleme.
- **Anket Güncelleme**: Mevcut bir anketi düzenleme.
- **Hakkımızda Sayfası**: Platform hakkında bilgi.
- **404 Sayfası**: Hatalı sayfa talepleri için özel bir tasarım.

## 🛠️ Kullanılan Teknolojiler

- **React**: Uygulama geliştirme.
- **React Router**: Sayfa yönlendirme.
- **Redux**: Durum yönetimi.
- **Axios veya fetch**: API entegrasyonu.
- **CSS**: Özelleştirilmiş stil yönetimi.

## 📂 Proje Yapısı

```plaintext
src/
├── pages/
│   ├── Web/
│   │   ├── Index.js         # Anasayfa
│   │   ├── Auth.js          # Kullanıcı işlemleri
│   │   ├── AuthExit.js      # Çıkış işlemleri
│   │   ├── AllSurveys.js    # Tüm anketler
│   │   ├── SurveysView.js   # Anket sonuçları
│   │   ├── SurveysVote.js   # Oy verme
│   │   ├── SurveysAdd.js    # Yeni anket ekleme
│   │   ├── SurveysEdit.js   # Anket güncelleme
│   │   ├── About.js         # Hakkımızda
├── hooks/
│   ├── userToken.js         # Kullanıcı girişi kontrolü
├── App.js                   # Ana uygulama bileşeni
├── index.css                # Global stil
├── index.js                 # Uygulama başlangıç noktası
```

## 📄 Lisans
Bu proje MIT lisansı altında sunulmaktadır.

## 📫 İletişim

Herhangi bir sorunuz veya geri bildiriminiz varsa, benimle iletişime geçebilirsiniz:

- **GitHub:** [ebuenesy2](https://github.com/ebuenesy2)  
- **Email:** ebuenesy2@gmail.com  
- **LinkedIn:** [Ebu Enes Yıldırım](https://www.linkedin.com/in/ebuenesyildirim/)

