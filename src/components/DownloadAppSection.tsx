
import React from 'react';
import { Button } from "@/components/ui/button";

export function DownloadAppSection() {
  return (
    <section className="py-16 md:py-24 bg-shaadi-cream">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold">Download ShaadiHub on Your Mobile</h2>
            <p className="text-lg text-muted-foreground">
              Access all wedding details, communicate with guests, and manage your events on the go with our mobile app.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2 bg-black text-white px-4 py-3 rounded-lg hover:bg-gray-800 cursor-pointer">
                <div className="text-3xl">
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7z"></path>
                    <rect x="9" y="3" width="6" height="4" rx="2"></rect>
                  </svg>
                </div>
                <div>
                  <div className="text-xs">Download on</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-black text-white px-4 py-3 rounded-lg hover:bg-gray-800 cursor-pointer">
                <div className="text-3xl">
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="3 3 21 12 3 21 3 3"></polygon>
                  </svg>
                </div>
                <div>
                  <div className="text-xs">GET IT ON</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-64 h-[500px]">
              <div className="absolute inset-0 rounded-3xl overflow-hidden border-8 border-shaadi-dark/10 shadow-xl">
                <div className="w-full h-full bg-shaadi-light flex items-center justify-center">
                  <div className="text-lg font-semibold text-shaadi-maroon text-center p-4">
                    Mobile App Preview <br />
                    <span className="text-sm">Coming Soon</span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-3xl bg-gradient-to-r from-shaadi-gold/30 to-shaadi-orange/30 blur-md"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
