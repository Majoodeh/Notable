import { ZapIcon } from "lucide-react";
import React from "react";

const RateLimitedUI: React.FC = () => {
  return (
    <div className="mx-auto px-4 py-8 max-w-6xl">
      <div className="bg-accent/10 shadow-md border border-accent/50 rounded-lg">
        <div className="flex md:flex-row flex-col items-center p-6">
          <div className="bg-accent/20 md:mr-6 mb-4 md:mb-0 p-4 rounded-full shrink-0">
            <ZapIcon className="size-10 text-accent" />
          </div>
          <div className="flex-1 md:text-left text-center">
            <h3 className="mb-2 font-bold text-xl"> Rate Limit Reached</h3>
            <p className="mb-1 text-base-content">
              {" "}
              You have made too many requests in a short period. Please wait a
              moment before trying again.{" "}
            </p>
            <p className="text-sm text-base-content/70">
              {" "}
              Try again in a few seconds{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;
