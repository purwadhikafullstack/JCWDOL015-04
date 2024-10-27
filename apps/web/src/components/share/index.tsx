'use client';

import { useState } from 'react';
import FbButton from './facebook';
import LinkedInButton from './linkedIn';
import TwitterButton from './twitter';
import WaButton from './wa';



const base_url = process.env.BASE_URL_WEB || 'purwadhika.com';

export default function ShareButton({
  slug,
  className,
}: {
  slug: string;
  className: string;
}) {

 

  return (
    <div className={`${className}`}>˜
      <div className="flex flex-col">
 
        <div className="flex items-center">
          <p className="text-base text-black pr-5">Share this job:</p>
          <div className="flex gap-1">
            <TwitterButton slug={slug} url={base_url}  />
            <WaButton slug={slug} url={base_url}  />
            <FbButton slug={slug} url={base_url} />
            <LinkedInButton  slug={slug} url={base_url} />
          </div>
        </div>
      </div>
    </div>
  );
}
