/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/

import { Web3APISpec, EIP1193Provider } from "web3-types";


export enum Eip6963EventName {
  eip6963announceProvider = 'eip6963:announceProvider',
  eip6963requestProvider = 'eip6963:requestProvider',
};

export interface EIP6963ProviderInfo {
  uuid: string;
  name: string;
  icon: string;
  rdns: string;
}

export interface EIP6963ProviderDetail<API = Web3APISpec> {
  info: EIP6963ProviderInfo;
  provider: EIP1193Provider<API>;
}

export interface EIP6963AnnounceProviderEvent<API = Web3APISpec> extends CustomEvent {
  type: Eip6963EventName.eip6963announceProvider;
  detail: EIP6963ProviderDetail<API>;
}

export interface EIP6963RequestProviderEvent extends Event {
  type: Eip6963EventName.eip6963requestProvider;
}

export const eip6963Providers: Map<string, EIP6963ProviderDetail> = new Map();

export const requestEIP6963Providers = () => {

  if (typeof window === 'undefined')
    throw new Error(
      "window object not available, EIP-6963 is intended to be used within a browser"
    );

  window.addEventListener(
    Eip6963EventName.eip6963announceProvider as any,
    (event: EIP6963AnnounceProviderEvent) => {

      eip6963Providers.set(
        event.detail.info.uuid,
        event.detail);
    }
  );

  window.dispatchEvent(new Event(Eip6963EventName.eip6963requestProvider));

  return eip6963Providers;
}


