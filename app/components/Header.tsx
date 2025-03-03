'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'History', href: '#' },
  { name: 'Team', href: '#' },
  { name: 'Contact', href: '#' },
  { name: 'About', href: '#' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="flex justify-center mx-8">
        <nav className="mt-6 flex items-center rounded-full border border-[black] bg-white shadow-lg">
          <div className="flex items-center w-full justify-between">
            <div className="px-4">
              <a href="#" className="flex-shrink-0">
                <span className="sr-only">Landmark</span>
                <img
                  alt="Landmark"
                  src="/logo.svg"
                  className="h-8 w-auto"
                />
              </a>
            </div>
            <div className="hidden lg:flex gap-x-10 py-3"> 
              {navigation.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  className="px-2 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100/50"
                >
                  {item.name}
                </a> 
              ))}
            </div>
            <div className="pr-4">
              <div className="flex lg:hidden">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                >
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="size-6" />
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Landmark</span>
              <img
                alt="Landmark"
                src="/logo.svg"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg bg-gray-100 px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-200"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
