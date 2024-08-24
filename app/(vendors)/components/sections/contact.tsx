'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Field, Switch } from '@headlessui/react';
import { Textarea } from '@/components/ui/text-area';
import SubmitButton from '@/components/ui/submit-button';
import { PhoneInput } from '@/components/ui/phone-input';

export default function Contact() {
  const [agreed, setAgreed] = useState(false);

  return (
    <section className="isolate mx-auto max-w-7xl">
      <div aria-hidden="true" className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
        <div
          style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact sales</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">Aute magna irure deserunt veniam aliqua magna enim voluptate.</p>
      </div>
      <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <Label htmlFor="first-name">First name</Label>
            <div className="mt-2.5">
              <Input id="first-name" name="first-name" type="text" autoComplete="given-name" />
            </div>
          </div>
          <div>
            <Label htmlFor="last-name">Last name</Label>
            <div className="mt-2.5">
              <Input id="last-name" name="last-name" type="text" autoComplete="family-name" />
            </div>
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="company">Company</Label>
            <div className="mt-2.5">
              <Input id="company" name="company" type="text" autoComplete="organization" />
            </div>
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="email">Email</Label>
            <div className="mt-2.5">
              <Input id="email" name="email" type="email" autoComplete="email" />
            </div>
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="phone-number">Phone number</Label>
            <div className="mt-2.5 w-full">
              <PhoneInput international countryCallingCodeEditable={false} className="w-full" id="phone-number" name="phone-number" type="tel" autoComplete="tel" />
            </div>
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="message">Message</Label>
            <div className="mt-2.5">
              <Textarea id="message" name="message" rows={3} defaultValue={''} />
            </div>
          </div>
          <Field className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch checked={agreed} onChange={setAgreed} className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 data-[checked]:bg-indigo-600">
                <span className="sr-only">Agree to policies</span>
                <span aria-hidden="true" className="h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5" />
              </Switch>
            </div>
            <Label className="text-sm leading-6 text-gray-600">
              By selecting this, you agree to our{' '}
              <a href="#" className="font-semibold text-indigo-600">
                privacy&nbsp;policy
              </a>
              .
            </Label>
          </Field>
        </div>
        <div className="mt-10">
          <SubmitButton label="Let's talk" pendingLabel="Sending..." />
        </div>
      </form>
    </section>
  );
}
