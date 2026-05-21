 

// const Footer = () => {
//   return <footer className="bg-slate-900 text-white pt-8 pb-8 mt-6 shrink-0 w-full">
  
//    <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center sm:text-left">
    
//      <div className="space-y-3">
//        <h3 className="text-xl font-extrabold tracking-wider text-white">
//         CHALO BABA
//       </h3>
//       <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto sm:mx-0">
//         Your own digital shop. Best quality and fast delivery is our commitment.
//       </p>
//     </div>

//      <div>
//       <h4 className="font-bold mb-4 text-slate-200 tracking-wide text-sm sm:text-base">
//         Quick Links
//       </h4>
//        <ul className="text-slate-400 text-sm space-y-2.5">
//         <li>
//           <a href="/about" className="hover:text-white transition-colors cursor-pointer block sm:inline-block">
//             About Us
//           </a>
//         </li>
//         <li>
//           <a href="/contact" className="hover:text-white transition-colors cursor-pointer block sm:inline-block">
//             Contact Us
//           </a>
//         </li>
//         <li>
//           <a href="/shipping-policy" className="hover:text-white transition-colors cursor-pointer block sm:inline-block">
//             Shipping & Policy
//           </a>
//         </li>
//       </ul>
//     </div>

//      <div className="space-y-2">
//       <h4 className="font-bold mb-4 text-slate-200 tracking-wide text-sm sm:text-base">
//         Contact
//       </h4>
//        <p className="text-slate-400 text-sm hover:text-white transition-colors">
//         <a href="mailto:bilalahmad.shaheen@gmail.com">bilalahmad.shaheen@gmail.com</a>
//       </p>
//       <p className="text-slate-400 text-sm tracking-wide">
//         +92 300 7255928
//       </p>
//     </div>

//   </div>

//    <div className="container mx-auto px-4 border-t border-slate-800/80 mt-10 pt-5 text-center text-slate-500 text-xs sm:text-sm tracking-wide">
//     &copy; {new Date().getFullYear()} Chalo BaBa. All rights reserved.
//   </div>

// </footer>
// }
// export default Footer


const Footer = () => {
  return (
    /* 🟢 تبدیلی ۱: ہم نے 'pt-8 pb-8' کو بدل کر 'py-6 md:py-10' کر دیا ہے۔
       اب موبائل پر یہ فالتو جگہ نہیں گھیرے گا بلکہ سمارٹ رہے گا، اور کمپیوٹر پر خودبخود کھل جائے گا */
    <footer className="bg-slate-900 text-white py-6 md:py-10 mt-6 shrink-0 w-full">
      
      {/* 🟢 تبدیلی ۲: گرڈ سسٹم کو سمارٹ کیا ہے۔ 
          - موبائل پر: 'grid-cols-1' (سب اوپر نیچے)
          - چوڑے موبائل یا ٹیبلٹ پر (sm): 'sm:grid-cols-3' (تینوں کالمز آمنے سامنے خوبصورت لائن میں)
          - 'gap-6 md:gap-8': موبائل پر کالمز کا درمیانی فاصلہ کم کر دیا ہے تاکہ چوڑائی متناسب رہے */}
      <div className="w-full max-w-350 mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 text-center sm:text-left">
        
        {/* کالم ۱: برانڈ نام اور تفصیل */}
        {/* 🟢 تبدیلی ۳: 'space-y-3' کو موبائل کے لیے 'space-y-1.5 sm:space-y-3' کیا تاکہ موبائل پر زیادہ لمبا نہ کھینچے */}
        <div className="space-y-1.5 sm:space-y-3">
          <h3 className="text-lg sm:text-xl font-extrabold tracking-wider text-white">
            CHALO BABA
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto sm:mx-0">
            Your own digital shop. Best quality and fast delivery is our commitment.
          </p>
        </div>

        {/* کالم ۲: لنکس */}
        {/* 🟢 تبدیلی ۴: 'mb-4' کو 'mb-2 sm:mb-4' کیا تاکہ موبائل پر ہیڈنگ اور لنکس کے بیچ خالی جگہ کم ہو */}
        <div>
          <h4 className="font-bold mb-2 sm:mb-4 text-slate-200 tracking-wide text-xs sm:text-sm uppercase">
            Quick Links
          </h4>
          <ul className="text-slate-400 text-xs sm:text-sm space-y-1.5 sm:space-y-2.5">
            <li>
              <a href="/about" className="hover:text-white transition-colors cursor-pointer block sm:inline-block">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white transition-colors cursor-pointer block sm:inline-block">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/shipping-policy" className="hover:text-white transition-colors cursor-pointer block sm:inline-block">
                Shipping & Policy
              </a>
            </li>
          </ul>
        </div>

        {/* کالم ۳: رابطہ */}
        <div className="space-y-1 sm:space-y-2">
          <h4 className="font-bold mb-2 sm:mb-4 text-slate-200 tracking-wide text-xs sm:text-sm uppercase">
            Contact
          </h4>
          <p className="text-slate-400 text-xs sm:text-sm hover:text-white transition-colors break-all">
            <a href="mailto:bilalahmad.shaheen@gmail.com">bilalahmad.shaheen@gmail.com</a>
          </p>
          <p className="text-slate-400 text-xs sm:text-sm tracking-wide">
            +92 300 7255928
          </p>
        </div>

      </div>

      {/* 🟢 تبدیلی ۵: نچلی پٹی کی مارجن 'mt-10 pt-5' کو کم کر کے 'mt-6 pt-4 md:mt-10' کر دیا ہے 
          اس سے موبائل پر نیچے کی فالتو کالی پٹی بہت چھوٹی اور چست ہو جائے گی */}
      <div className="w-full max-w-350 mx-auto px-4 border-t border-slate-800/80 mt-6 pt-4 md:mt-10 text-center text-slate-500 text-[11px] sm:text-xs tracking-wide">
        &copy; {new Date().getFullYear()} Chalo BaBa. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;