import React, { useState } from 'react';
import { 
  CheckCircle, ShieldCheck, Truck, Globe, Search, PlusCircle, 
  UserCheck, AlertTriangle, FileText, ArrowRight, MapPin, Tag, Leaf 
} from 'lucide-react';

export default function KrishiBridge() {
  const [activeTab, setActiveTab] = useState('farmer');
  const [language, setLanguage] = useState('EN');

  // Initial Mock State
  const [listings, setListings] = useState([
    {
      id: 1,
      farmerName: 'Ramesh Kumar',
      crop: 'Sona Masoori Rice',
      quantity: 50, // Quintals
      price: 3200, // Per Quintal
      location: 'Guntur, Andhra Pradesh',
      status: 'Verified',
      grade: 'Grade A (Moisture 11%)',
      bids: [{ buyer: 'AgriCorp Exports', offer: 3250 }]
    },
    {
      id: 2,
      farmerName: 'Suresh Reddy',
      crop: 'Red Chilli (Teja)',
      quantity: 20,
      price: 18000,
      location: 'Khammam, Telangana',
      status: 'Pending Inspection',
      grade: 'Awaiting Hub Test',
      bids: []
    }
  ]);

  const [newCrop, setNewCrop] = useState({
    farmerName: '',
    crop: 'Sona Masoori Rice',
    quantity: '',
    price: '',
    location: ''
  });

  const [inspectionForm, setInspectionForm] = useState({
    listingId: 2,
    moisture: '12%',
    purity: '98%',
    grade: 'Grade A'
  });

  const handleAddListing = (e) => {
    e.preventDefault();
    if (!newCrop.farmerName || !newCrop.quantity || !newCrop.price) return;
    
    const item = {
      id: listings.length + 1,
      farmerName: newCrop.farmerName,
      crop: newCrop.crop,
      quantity: Number(newCrop.quantity),
      price: Number(newCrop.price),
      location: newCrop.location || 'Vijayawada, AP',
      status: 'Pending Inspection',
      grade: 'Awaiting Hub Test',
      bids: []
    };
    
    setListings([...listings, item]);
    setNewCrop({ farmerName: '', crop: 'Sona Masoori Rice', quantity: '', price: '', location: '' });
    alert('Listing submitted! Marked as "Pending Inspection".');
  };

  const handleApproveInspection = (id) => {
    setListings(listings.map(item => {
      if (item.id === id) {
        return { 
          ...item, 
          status: 'Verified', 
          grade: `${inspectionForm.grade} (Moisture ${inspectionForm.moisture}, Purity ${inspectionForm.purity})` 
        };
      }
      return item;
    }));
    alert(`Listing #${id} quality verified & unlocked for bidding!`);
  };

  const handlePlaceBid = (id) => {
    setListings(listings.map(item => {
      if (item.id === id) {
        return { 
          ...item, 
          status: 'Escrow Locked',
          bids: [...item.bids, { buyer: 'Southern Foods Pvt Ltd', offer: item.price }] 
        };
      }
      return item;
    }));
    alert('Bid placed! Funds deposited into Secure Escrow Account.');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Top Navigation */}
      <header className="bg-emerald-700 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-amber-400" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">KrishiBridge</h1>
              <p className="text-xs text-emerald-200">Direct Agri Trade • Escrow Verification • South India Hub</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex bg-emerald-800 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('farmer')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                activeTab === 'farmer' ? 'bg-white text-emerald-800 shadow' : 'text-emerald-100 hover:text-white'
              }`}
            >
              Farmer Portal
            </button>
            <button
              onClick={() => setActiveTab('agent')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                activeTab === 'agent' ? 'bg-white text-emerald-800 shadow' : 'text-emerald-100 hover:text-white'
              }`}
            >
              Field Agent Portal
            </button>
            <button
              onClick={() => setActiveTab('buyer')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                activeTab === 'buyer' ? 'bg-white text-emerald-800 shadow' : 'text-emerald-100 hover:text-white'
              }`}
            >
              Buyer Marketplace
            </button>
          </nav>

          {/* Language Selector */}
          <div className="flex items-center gap-2 bg-emerald-800 px-3 py-1.5 rounded-lg text-xs">
            <Globe className="h-4 w-4 text-amber-300" />
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-white focus:outline-none cursor-pointer font-medium"
            >
              <option value="EN" className="text-slate-800">English</option>
              <option value="TE" className="text-slate-800">తెలుగు (Telugu)</option>
              <option value="TA" className="text-slate-800">தமிழ் (Tamil)</option>
              <option value="KN" className="text-slate-800">கன்னட (Kannada)</option>
              <option value="ML" className="text-slate-800">മലയാളം (Malayalam)</option>
              <option value="HI" className="text-slate-800">हिंदी (Hindi)</option>
            </select>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* TAB 1: FARMER PORTAL */}
        {activeTab === 'farmer' && (
          <div className="space-y-6">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-emerald-900 flex items-center gap-2">
                <PlusCircle className="h-6 w-6 text-emerald-600" />
                List Your Crop Batch
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                New listings are published as <span className="font-semibold text-amber-700">"Pending Inspection"</span>. Bidding opens after a 1-visit hub test.
              </p>

              <form onSubmit={handleAddListing} className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Farmer Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Venkatesh Rao"
                    value={newCrop.farmerName}
                    onChange={(e) => setNewCrop({ ...newCrop, farmerName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-emerald-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Crop Type</label>
                  <select
                    value={newCrop.crop}
                    onChange={(e) => setNewCrop({ ...newCrop, crop: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-emerald-600"
                  >
                    <option value="Sona Masoori Rice">Sona Masoori Rice</option>
                    <option value="Red Chilli (Teja)">Red Chilli (Teja)</option>
                    <option value="Turmeric (Erode)">Turmeric (Erode)</option>
                    <option value="Cotton (Long Staple)">Cotton (Long Staple)</option>
                    <option value="Black Pepper">Black Pepper</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Quantity (Quintals)</label>
                  <input
                    type="number"
                    placeholder="e.g. 40"
                    value={newCrop.quantity}
                    onChange={(e) => setNewCrop({ ...newCrop, quantity: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-emerald-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Asking Price (₹ / Quintal)</label>
                  <input
                    type="number"
                    placeholder="e.g. 3500"
                    value={newCrop.price}
                    onChange={(e) => setNewCrop({ ...newCrop, price: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-emerald-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Hub Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Warangal, Telangana"
                    value={newCrop.location}
                    onChange={(e) => setNewCrop({ ...newCrop, location: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-emerald-600"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-medium py-2 px-4 rounded-lg text-sm transition"
                  >
                    Submit for Hub Verification
                  </button>
                </div>
              </form>
            </div>

            {/* Farmer Active Listings */}
            <div className="bg-white border rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4">Your Active Crop Batches</h3>
              <div className="space-y-3">
                {listings.map((item) => (
                  <div key={item.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900">{item.crop}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          item.status === 'Verified' ? 'bg-emerald-100 text-emerald-800' :
                          item.status === 'Escrow Locked' ? 'bg-blue-100 text-blue-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        {item.quantity} Quintals • ₹{item.price}/Quintal • {item.location}
                      </p>
                      <p className="text-xs text-slate-600 font-mono mt-0.5">Report: {item.grade}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-slate-500">Highest Bid Received</p>
                      <p className="font-bold text-emerald-700">
                        {item.bids.length > 0 ? `₹${item.bids[0].offer} / Quintal` : 'Awaiting Bids'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FIELD AGENT PORTAL */}
        {activeTab === 'agent' && (
          <div className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-amber-900 flex items-center gap-2">
                <UserCheck className="h-6 w-6 text-amber-600" />
                Collection Center / Hub Inspection Station
              </h2>
              <p className="text-sm text-amber-800 mt-1">
                Inspect samples dropped off at local hubs or perform combined on-farm loading inspection to verify moisture, grade, and issuing digital certificate.
              </p>

              <div className="mt-6 bg-white border rounded-lg p-4">
                <h3 className="font-semibold text-sm mb-3 text-slate-700">Perform Quality Grading</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold mb-1">Target Batch ID</label>
                    <select 
                      value={inspectionForm.listingId} 
                      onChange={(e) => setInspectionForm({ ...inspectionForm, listingId: Number(e.target.value) })}
                      className="w-full p-2 border rounded"
                    >
                      {listings.map(l => (
                        <option key={l.id} value={l.id}>
                          #{l.id} - {l.crop} ({l.farmerName})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Moisture Level (%)</label>
                    <input 
                      type="text" 
                      value={inspectionForm.moisture} 
                      onChange={(e) => setInspectionForm({ ...inspectionForm, moisture: e.target.value })}
                      className="w-full p-2 border rounded" 
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Purity Score (%)</label>
                    <input 
                      type="text" 
                      value={inspectionForm.purity} 
                      onChange={(e) => setInspectionForm({ ...inspectionForm, purity: e.target.value })}
                      className="w-full p-2 border rounded" 
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Assigned Grade</label>
                    <select 
                      value={inspectionForm.grade}
                      onChange={(e) => setInspectionForm({ ...inspectionForm, grade: e.target.value })}
                      className="w-full p-2 border rounded"
                    >
                      <option value="Grade A">Grade A (Premium)</option>
                      <option value="Grade B">Grade B (Standard)</option>
                      <option value="Grade C">Grade C (Commercial)</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => handleApproveInspection(inspectionForm.listingId)}
                  className="mt-4 bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition flex items-center gap-2"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Approve Quality & Unlock Bidding
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BUYER MARKETPLACE */}
        {activeTab === 'buyer' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 border rounded-xl shadow-sm">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search crop, state, or grade..."
                  className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-emerald-600"
                />
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>Only Quality-Verified Listings Accept Binding Escrow Bids</span>
              </div>
            </div>

            {/* Marketplace Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {listings.map((item) => (
                <div key={item.id} className="bg-white border rounded-xl p-6 shadow-sm space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        item.status === 'Verified' ? 'bg-emerald-100 text-emerald-800' :
                        item.status === 'Escrow Locked' ? 'bg-blue-100 text-blue-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {item.status}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 mt-2">{item.crop}</h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" /> {item.location} • By {item.farmerName}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400">Asking Price</span>
                      <p className="text-xl font-bold text-emerald-700">₹{item.price}</p>
                      <span className="text-xs text-slate-500">per Quintal</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg border text-xs space-y-1">
                    <p className="font-semibold text-slate-700 flex items-center gap-1">
                      <FileText className="h-3 w-3 text-emerald-600" /> Inspection Certificate:
                    </p>
                    <p className="text-slate-600 font-mono">{item.grade}</p>
                  </div>

                  {item.status === 'Verified' ? (
                    <button
                      onClick={() => handlePlaceBid(item.id)}
                      className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-medium py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-2"
                    >
                      <ShieldCheck className="h-4 w-4" />
                      Place Bid & Lock Funds in Escrow
                    </button>
                  ) : item.status === 'Escrow Locked' ? (
                    <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-lg text-center text-xs text-blue-800 font-semibold flex items-center justify-center gap-1">
                      <Truck className="h-4 w-4" /> Escrow Secured • Ready for Dispatch
                    </div>
                  ) : (
                    <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-center text-xs text-amber-800 font-medium flex items-center justify-center gap-1">
                      <AlertTriangle className="h-4 w-4" /> Locked - Pending Quality Verification at Hub
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* System Workflow Footer Note */}
        <section className="mt-12 border-t pt-6">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            KrishiBridge Escrow & Logistics Safety Loop
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs text-slate-600">
            <div className="bg-white p-3 rounded border">
              <span className="font-bold text-emerald-700">1. Unverified Listing</span>
              <p className="mt-1">Farmer registers crop batch. Bids remain locked to protect buyers.</p>
            </div>
            <div className="bg-white p-3 rounded border">
              <span className="font-bold text-emerald-700">2. Hub Inspection</span>
              <p className="mt-1">Single visit at local collection center verifies moisture and grade.</p>
            </div>
            <div className="bg-white p-3 rounded border">
              <span className="font-bold text-emerald-700">3. Escrow Deposit</span>
              <p className="mt-1">Buyer places winning bid; payment locked safely in escrow account.</p>
            </div>
            <div className="bg-white p-3 rounded border">
              <span className="font-bold text-emerald-700">4. Sealed Dispatch</span>
              <p className="mt-1">Loading confirmed at pickup; escrow instantly released to farmer.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
