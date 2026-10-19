import React, { useState } from 'react';
import { translations } from '../data/translations';
import { mandiRates, sampleMarketListings } from '../data/mandiRates';
import { speakText } from '../services/speechService';
import confetti from 'canvas-confetti';
import {
  TrendingUp,
  Search,
  MapPin,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  PlusCircle,
  MessageCircle,
  Phone,
  ShieldCheck,
  CheckCircle2,
  X,
  Volume2
} from 'lucide-react';

export default function MandiMarketplace({ lang }) {
  const t = translations[lang];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("all");
  const [marketListings, setMarketListings] = useState(sampleMarketListings);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State for new listing
  const [newCrop, setNewCrop] = useState("धान बासमती 1509");
  const [newQuantity, setNewQuantity] = useState("100");
  const [newPrice, setNewPrice] = useState("3900");
  const [newFarmerName, setNewFarmerName] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const filteredMandiRates = mandiRates.filter((item) => {
    const matchesSearch = 
      item.crop_hi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.crop_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.variety.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesState = selectedState === 'all' || item.state.toLowerCase().includes(selectedState.toLowerCase());

    return matchesSearch && matchesState;
  });

  const handleAddListing = (e) => {
    e.preventDefault();
    if (!newFarmerName || !newLocation || !newPhone) {
      alert(lang === 'hi' ? 'कृपया सभी जानकारी भरें!' : 'Please fill all details!');
      return;
    }

    const listing = {
      id: `lst-${Date.now()}`,
      farmer_name: newFarmerName,
      location: newLocation,
      crop: newCrop,
      quantity: `${newQuantity} क्विंटल`,
      expected_price: `₹${newPrice} / क्विंटल`,
      quality_grade: "Direct Farmer Verified",
      phone: newPhone,
      verified: true,
      days_ago: lang === 'hi' ? 'अभी पोस्ट किया गया (Just Now)' : 'Just posted'
    };

    setMarketListings([listing, ...marketListings]);
    setIsModalOpen(false);

    // Confetti Celebration
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Reset Form
    setNewFarmerName("");
    setNewLocation("");
    setNewPhone("");
  };

  const playMandiAudio = () => {
    const text = lang === 'hi'
      ? `आज का प्रमुख मंडी भाव: बासमती धान 3,850 रुपये, शरबती गेहूं 2,480 रुपये, सरसों 5,820 रुपये और सोयाबीन 4,890 रुपये प्रति क्विंटल चल रहा है। करनाल मंडी में धान का सबसे ऊंचा भाव 3,990 रुपये मिल रहा है।`
      : `Today's prime Mandi prices: Basmati Paddy ₹3,850, Sharbati Wheat ₹2,480, Mustard ₹5,820, and Soybean ₹4,890 per quintal. Karnal Mandi offers the highest Basmati rate at ₹3,990.`;
    speakText(text, lang);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
            <span>{t.mandiTitle}</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            {t.mandiSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={playMandiAudio}
            className="flex items-center gap-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-emerald-700" />
            <span>{t.listenAudio}</span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold px-4 py-1.5 rounded-full text-xs shadow-sm cursor-pointer transition-transform hover:scale-105"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t.sellProduceBtn}</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchCrop}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-2xs"
          />
        </div>

        <select
          aria-label={t.selectState}
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-700 focus:outline-hidden focus:border-emerald-500 shadow-2xs cursor-pointer"
        >
          <option value="all">{lang === 'hi' ? 'सभी राज्य (All States)' : 'All States'}</option>
          <option value="Punjab">Punjab</option>
          <option value="Haryana">Haryana</option>
          <option value="UP">Uttar Pradesh</option>
          <option value="MP">Madhya Pradesh</option>
          <option value="Rajasthan">Rajasthan</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Gujarat">Gujarat</option>
        </select>
      </div>

      {/* Mandi Rate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMandiRates.map((item) => {
          const isAboveMsp = item.msp > 0 && item.current_avg >= item.msp;
          const diffMsp = item.msp > 0 ? item.current_avg - item.msp : 0;

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
                  <div>
                    <h5 className="text-base font-extrabold text-slate-900">
                      {lang === 'hi' ? item.crop_hi : item.crop_en}
                    </h5>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {item.variety}
                    </span>
                  </div>

                  <div className="text-right">
                    <div className="text-xl font-black text-emerald-700">
                      ₹{item.current_avg.toLocaleString('en-IN')}
                    </div>
                    <span className="text-[10px] text-slate-400 block font-semibold">{item.unit}</span>
                  </div>
                </div>

                {/* MSP & Trend Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
                  {item.msp > 0 ? (
                    <span className={`px-2 py-0.5 rounded-md font-bold text-[11px] ${
                      isAboveMsp ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      MSP: ₹{item.msp} ({isAboveMsp ? `+₹${diffMsp}` : `-₹${Math.abs(diffMsp)}`})
                    </span>
                  ) : (
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-bold text-[11px]">
                      खुला बाजार भाव (Open Market)
                    </span>
                  )}

                  <span className={`flex items-center gap-0.5 px-2 py-0.5 rounded-md font-bold text-[11px] ${
                    item.change_today > 0 ? 'bg-emerald-50 text-emerald-700' : item.change_today < 0 ? 'bg-rose-50 text-rose-700' : 'bg-slate-50 text-slate-700'
                  }`}>
                    {item.change_today > 0 ? (
                      <>
                        <ArrowUpRight className="w-3 h-3" />
                        <span>+₹{item.change_today} आज</span>
                      </>
                    ) : item.change_today < 0 ? (
                      <>
                        <ArrowDownRight className="w-3 h-3" />
                        <span>-₹{Math.abs(item.change_today)} आज</span>
                      </>
                    ) : (
                      <>
                        <Minus className="w-3 h-3" />
                        <span>स्थिर</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Highest Rate Mandi Nearby */}
                <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-100 mb-3 space-y-1">
                  <span className="text-[10px] font-bold text-emerald-900 uppercase tracking-wider block">
                    {t.highestMandi}:
                  </span>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">
                      {lang === 'hi' ? item.top_mandi.name_hi : item.top_mandi.name_en}
                    </span>
                    <span className="font-extrabold text-emerald-700 text-sm">
                      ₹{item.top_mandi.price}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-semibold block">
                    दूरी: ~{item.top_mandi.distance_km} किमी (स्थानीय से +₹{item.top_mandi.price - item.local_mandi.price} अधिक)
                  </span>
                </div>

                {/* Agronomist Advice */}
                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="font-bold text-slate-800">💡 सलाह: </span>
                  {lang === 'hi' ? item.recommendation_hi : item.recommendation_en}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono text-[11px]">{item.state}</span>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer flex items-center gap-1"
                >
                  <span>{lang === 'hi' ? 'यह फसल बेचें' : 'Sell This Crop'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Direct Farmer-to-Buyer Marketplace Section */}
      <div className="mt-10 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full text-[11px] font-bold mb-1">
              <Sparkles className="w-3 h-3 text-emerald-700" />
              <span>सीधी खरीद-बिक्री (Zero Commission)</span>
            </div>
            <h4 className="text-lg font-bold text-slate-800">
              {lang === 'hi' ? 'सक्रिय किसान मंडियां व सीधी बिक्री सूचियां' : 'Live Direct Farmer Harvest Listings'}
            </h4>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-sm cursor-pointer transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t.sellProduceBtn}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {marketListings.map((listing) => (
            <div
              key={listing.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-slate-900 text-sm">{listing.farmer_name}</span>
                    {listing.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    )}
                  </div>
                  <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{listing.location}</span>
                  </span>
                </div>
                <span className="text-[10px] bg-slate-200/80 text-slate-700 font-semibold px-2 py-0.5 rounded-md">
                  {listing.days_ago}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs bg-white p-3 rounded-lg border border-slate-100">
                <div>
                  <span className="text-slate-400 text-[10px] block">फसल व मात्रा:</span>
                  <span className="font-bold text-slate-800">{listing.crop}</span>
                  <span className="text-emerald-700 block font-semibold">{listing.quantity}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">मांग भाव (Expected):</span>
                  <span className="font-extrabold text-slate-900 text-sm">{listing.expected_price}</span>
                  <span className="text-[10px] text-slate-500 block">{listing.quality_grade}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <a
                  href={`https://wa.me/${listing.phone.replace(/[^0-9]/g, '')}?text=Namaste, I saw your crop listing for ${encodeURIComponent(listing.crop)} on KisanMitra AI.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg text-xs shadow-xs transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp चैट</span>
                </a>
                <a
                  href={`tel:${listing.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center justify-center gap-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer"
                  title="Call Farmer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>कॉल</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sell Produce Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-emerald-600" />
                <span>{t.listModalTitle}</span>
              </h4>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddListing} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {lang === 'hi' ? 'किसान का नाम' : 'Farmer Full Name'} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={lang === 'hi' ? 'उदा. सोहन लाल' : 'e.g. Sohan Lal'}
                  value={newFarmerName}
                  onChange={(e) => setNewFarmerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {lang === 'hi' ? 'फसल' : 'Crop'} *
                  </label>
                  <select
                    value={newCrop}
                    onChange={(e) => setNewCrop(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
                  >
                    <option value="गेहूँ शरबती (Wheat)">गेहूँ (Wheat)</option>
                    <option value="धान बासमती 1509 (Paddy)">धान बासमती (Paddy)</option>
                    <option value="सरसों पूसा बोल्ड (Mustard)">सरसों (Mustard)</option>
                    <option value="सोयाबीन (Soybean)">सोयाबीन (Soybean)</option>
                    <option value="आलू (Potato)">आलू (Potato)</option>
                    <option value="टमाटर (Tomato)">टमाटर (Tomato)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {lang === 'hi' ? 'मात्रा (क्विंटल)' : 'Quantity (Qtl)'} *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="100"
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {lang === 'hi' ? 'मांग भाव (₹ प्रति क्विंटल)' : 'Asking Rate (₹/Quintal)'} *
                </label>
                <input
                  type="number"
                  required
                  placeholder="3800"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {lang === 'hi' ? 'गाँव / तहसील / जिला' : 'Village / District'} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={lang === 'hi' ? 'उदा. शामली, उत्तर प्रदेश' : 'e.g. Shamli, Uttar Pradesh'}
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {lang === 'hi' ? 'फ़ोन / व्हाट्सएप नंबर' : 'Phone / WhatsApp Number'} *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-bold text-white shadow-sm cursor-pointer transition-colors"
                >
                  {t.submitListing}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
