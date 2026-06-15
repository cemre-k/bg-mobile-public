# BG Mobile App

React Native ile Expo tabanlı bir mobile uygulaması. Bu proje, bir önceki iş yerindeki yarım kalan projeden geliştirilmiş olup, public portföy projesi olarak yayınlanmıştır.

## 📋 Proje Hakkında

Bu repository, uygulamaya baştan sona bakabilecek geliştiriciler için açık kaynak olarak paylaşılmaktadır. Proje, aşağıdaki başlıca özellikleri içermektedir:

- **Mobile-First Design**: Hem iOS hem de Android'te çalışan native uygulama
- **Modern Stack**: React Native + Expo + TypeScript + Tailwind CSS
- **File-Based Routing**: Expo Router kullanarak yapılandırılmış dosya tabanlı routing
- **Type Safety**: TypeScript ile tam tip desteği

## 🔐 Güvenlik Notu

> **Önemli**: Bu repository portföy amaçlı olarak hazırlanmıştır. Orijinal iş yeri git geçmişi ve dahili altyapı referansları kasıtlı olarak kaldırılmıştır. API endpoint'leri ve API anahtarları sanitize edilerek kaldırılmıştır.

Eğer bu repoyu inceliyorsanız, lütfen mevcut içeriği temiz bir public snapshot olarak değerlendirin.

## 🛠 Tech Stack

| Teknoloji | Sürüm | Amaç |
|-----------|-------|------|
| **React** | 19.1.0 | UI framework |
| **React Native** | 0.81.5 | Native mobile development |
| **Expo** | ~54.0.32 | Development platform & build tooling |
| **TypeScript** | ~5.9.2 | Type safety |
| **Tailwind CSS** | 3.4.19 | Styling (NativeWind via) |
| **Expo Router** | ~6.0.22 | File-based routing |
| **React Navigation** | 7.x | Navigation layer |

## 📁 Proje Yapısı

```
bg-mobile-public/
├── app/                      # Expo Router kullanarak dosya tabanlı routing
├── components/               # Reusable React Native bileşenleri
├── context/                  # React Context state yönetimi
├── utils/                    # Yardımcı fonksiyonlar ve utilities
├── package.json              # Proje bağımlılıkları
├── tailwind.config.js        # Tailwind CSS konfigürasyonu
├── tsconfig.json             # TypeScript konfigürasyonu
├── eas.json                  # Expo Application Services yapılandırması
├── app.json                  # Expo app konfigürasyonu
└── .env.example              # Environment variables şablonu
```

## 🚀 Başlangıç

### Ön Koşullar

- **Node.js** (v16 veya üstü)
- **npm** (v7 veya üstü)
- Geliştirme için Expo CLI: `npm install -g expo-cli`

### Kurulum Adımları

1. **Repository'yi klonlayın**
   ```bash
   git clone https://github.com/cemre-k/bg-mobile-public.git
   cd bg-mobile-public
   ```

2. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   ```

3. **Environment variables'ı ayarlayın**
   
   `.env.local` dosyasını `.env.example` şablonundan oluşturun:
   ```bash
   cp .env.example .env.local
   ```
   
   Ardından `.env.local` dosyasını düzenleyerek backend API URL'ini ekleyin:
   ```env
   EXPO_PUBLIC_API_BASE_URL=https://api.example.com
   ```
   
   > **Not**: Bu değer login, logout, chat ve şifre sıfırlama istekleri için kullanılır.

4. **Uygulamayı başlatın**
   ```bash
   npm start
   ```
   
   Terminal çıktısında şu seçenekleri göreceksiniz:
   - **[i]** iOS Simulator
   - **[a]** Android Emulator
   - **[w]** Web browser
   - **[j]** Expo Go uygulaması (cihazınızda)

### Geliştirme Komutları

```bash
# iOS Simulator'da çalıştır
npm run ios

# Android Emulator'da çalıştır
npm run android

# Web browser'da çalıştır
npm run web

# Projeyi sıfırla (starter code'u app-example'a taşı)
npm run reset-project

# ESLint ile kodu kontrol et
npm run lint
```

## 🏗 Proje Mimarisi

### State Yönetimi
- **React Context API**: `context/` dizininde yer alan context'ler ile state yönetimi

### Bileşen Yapısı
- **Reusable Components**: `components/` dizininde tekrar kullanılabilir UI bileşenleri
- **File-based Routing**: `app/` dizini Expo Router tarafından otomatik olarak route'lara dönüştürülür

### Styling
- **Tailwind CSS + NativeWind**: Yazı tipi yardımcı sınıfları (utility classes) ile styling
- Native ve web'de tutarlı stil uygulaması

### API İntegrasyonu
Uygulamadaki API çağrıları `.env.local` dosyasında tanımlanan `EXPO_PUBLIC_API_BASE_URL` değerini kullanır.

## 📱 Supported Platforms

- ✅ iOS (iOS 13+)
- ✅ Android (Android 5+)
- ✅ Web (Expo Web)

## 🔄 Güncelleme ve Bakım

Proje bağımlılıklarını güncellemek için:

```bash
npm update
```

Veya belirli bir paketi güncellemek için:
```bash
npm update <package-name>
```

## 📚 Kaynaklar

- [Expo Resmi Belgeleri](https://docs.expo.dev/)
- [React Native Dokümantasyonu](https://reactnative.dev/)
- [Expo Router Rehberi](https://docs.expo.dev/router/introduction/)
- [TypeScript Rehberi](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Dokümantasyonu](https://tailwindcss.com/docs)

## 🤝 Katkı

Bu proje portföy amaçlı bir snapshot olduğu için, doğrudan katkı kabul etmemektedir. Ancak:
- Bug raporlaması için [Issues](https://github.com/cemre-k/bg-mobile-public/issues) açabilirsiniz
- Geri bildirim ve öneriler için tartışma bölümünü kullanabilirsiniz

## 📝 Lisans

Bu proje açık kaynak olmakla birlikte, lisans bilgisi `LICENSE` dosyasında yer almaktadır.

## 💬 İletişim

Proje hakkında sorularınız için:
- GitHub Issues: [Issues](https://github.com/cemre-k/bg-mobile-public/issues)
- Profil: [@cemre-k](https://github.com/cemre-k)

---

**Son Güncelleme**: June 2026

Happy Coding! 🎉
