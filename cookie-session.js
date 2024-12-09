// local storage biz sil demeden silinmez hep orada bekler -> kalici -> beni hatirla

// session storage -> tarayiciyi kapatinca , site ziyareti süresünce saklanir -> yarim saat hic islem yapmazsak silinir -> gecici

// storage olanlar -> yonetim bize ait -> backend tarindan yonetemem -> client tarafindaki reacti kullanarak data saklarim

// token bize header dan gelir 

//! frondendde -> reactta local ve session storage kullanabilirim -> saklamak 

//! backkende -> cookie -> giris yapan kullaniciyi hatirlamak

// frondendde login olduk -> backend bize bu kullanici var dedi -> backendde kullanicinin girdigini login oldugunu bir yerde tutmaliki routes larda gezerken bu saklanan yerden cek etmeli -> backenin kullaniciyi hatirlayaccagi datalari saklamak

// 4 kb a kadar saklayabilir -> piyasa standarti 2 kb dir -> cookie

// cookie de kullanicinin login olup olmadigini tutacagim sadece 

// session -> oturum

// cookie -> sureli 

// local -> suresiz

//& server side session data -> data server da saklanir -> o tarayiciya ait oldugunu nereden bilecek -> cookieId var her tarayicinin

// session data -> server da da client de de saklanir -> server larda saklananlari da cookieId ile taniyor 

//& aslinda session yok her sey cookie dir -> bir sure atamazsam oturum boyunca saklanir -> piyasada session , süreli ise cookie

//! farkli routes lar arasinda gezerken nasil ayni kullanici oldugumuzu anliyor -> frontend de local || backend de cookie 