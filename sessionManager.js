// सुनिश्चित करें कि firebaseApp और firestore पहले से initialize हो चुके हैं 
// (firebaseConfig.js फ़ाइल में) और यहाँ SDKs लिंक किए गए हैं।

// Firestore Service प्राप्त करें (डेटा फ़ैच करने के लिए इसकी ज़रूरत नहीं है, 
// लेकिन लॉगआउट फ़ंक्शन में यह उपयोगी हो सकता है, हालाँकि हम इसे सरल रखेंगे)
const db = firebase.firestore();

// 1. सेशन चेक करने और रीडायरेक्ट करने का फ़ंक्शन
function checkUserSession() {
    // Local Storage से सेव्ड यूजर डॉक्यूमेंट ID (UID) लें
    const userId = localStorage.getItem('loggedInUserUID');
    // वर्तमान पेज का नाम प्राप्त करें
    const currentPage = window.location.pathname.split('/').pop();

    // 1.1. अगर यूजर लॉग इन है और login.html पर जाने की कोशिश कर रहा है
    if (userId && currentPage === 'login.html') {
        // उसे index.html पर भेज दें
        window.location.href = 'index.html';
        return; // आगे की जांच बंद करें
    }

    // 1.2. अगर यूजर लॉग इन नहीं है और किसी प्रोटेक्टेड पेज पर है
    if (!userId && currentPage !== 'login.html') {
        // उसे login.html पर रीडायरेक्ट करें
        console.log("Session not found. Redirecting to login.html");
        window.location.href = 'login.html';
        return; // आगे की जांच बंद करें
    }

    // 1.3. अगर यूजर लॉग इन है और प्रोटेक्टेड पेज पर है
    if (userId) {
        console.log("User session found:", userId);
        // यहाँ से कंट्रोल व्यक्तिगत HTML फ़ाइल को दें ताकि वह अपना डेटा फ़ैच करे
        // हम फ़ैच लॉजिक को इस फ़ाइल से हटा रहे हैं।
        return userId; 
    }
}

// 2. लॉग आउट फ़ंक्शन
// इसे global scope में रखें ताकि किसी भी HTML पेज के बटन से सीधे कॉल किया जा सके।
window.logoutUser = function() {
    localStorage.removeItem('loggedInUserUID');
    console.log("User logged out. Redirecting to login.html");
    // रीडायरेक्ट से पहले थोड़ा सा डिले दे सकते हैं यदि आवश्यक हो
    window.location.href = 'login.html';
}

// पेज लोड होते ही सेशन चेक करें
const currentUserId = checkUserSession(); 

// यह फ़ंक्शन प्रोटेक्टेड पेजों के लिए उपयोगी होगा
window.getUserId = function() {
    return localStorage.getItem('loggedInUserUID');
}
