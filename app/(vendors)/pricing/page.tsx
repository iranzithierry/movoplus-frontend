import { cn } from '@/lib/utils';
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';
import Header from '../components/header';

const plans = [
  {
    title: 'Starter',
    featured: false,
    description: 'All your essential business finances, taken care of.',
    priceMonthly: 5,
    priceYearly: 56,
    mainFeatures: [
      { id: 1, value: 'Basic invoicing' },
      { id: 2, value: 'Easy to use accounting' },
      { id: 3, value: 'Mutli-accounts' },
    ],
  },
  {
    title: 'Scale',
    featured: true,
    description: 'The best financial services for your thriving business.',
    priceMonthly: 19,
    priceYearly: 220,
    mainFeatures: [
      { id: 1, value: 'Advanced invoicing' },
      { id: 2, value: 'Easy to use accounting' },
      { id: 3, value: 'Mutli-accounts' },
      { id: 4, value: 'Tax planning toolkit' },
      { id: 5, value: 'VAT & VATMOSS filing' },
      { id: 6, value: 'Free bank transfers' },
    ],
  },
  {
    title: 'Growth',
    featured: false,
    description: 'Convenient features to take your business to the next level.',
    priceMonthly: 12,
    priceYearly: 140,
    mainFeatures: [
      { id: 1, value: 'Basic invoicing' },
      { id: 2, value: 'Easy to use accounting' },
      { id: 3, value: 'Mutli-accounts' },
      { id: 4, value: 'Tax planning toolkit' },
    ],
  },
];
const features = [
  {
    title: 'Tax Savings',
    tiers: [
      { title: 'starter', value: true },
      { title: 'popular', featured: true, value: true },
      { title: 'intermediate', value: true },
    ],
  },
  {
    title: 'Easy to use accounting',
    tiers: [
      { title: 'starter', value: true },
      { title: 'popular', featured: true, value: true },
      { title: 'intermediate', value: true },
    ],
  },
  {
    title: 'Multi-accounts',
    tiers: [
      { title: 'starter', value: '3 accounts' },
      { title: 'popular', featured: true, value: 'Unlimited accounts' },
      { title: 'intermediate', value: '7 accounts' },
    ],
  },
  {
    title: 'Invoicing',
    tiers: [
      { title: 'starter', value: '3 invoices' },
      { title: 'popular', featured: true, value: 'Unlimited invoices' },
      { title: 'intermediate', value: '10 invoices' },
    ],
  },
  {
    title: 'Exclusive offers',
    tiers: [
      { title: 'starter', value: false },
      { title: 'popular', featured: true, value: true },
      { title: 'intermediate', value: true },
    ],
  },
  {
    title: '6 months free advisor',
    tiers: [
      { title: 'starter', value: false },
      { title: 'popular', featured: true, value: true },
      { title: 'intermediate', value: true },
    ],
  },
  {
    title: 'Mobile and web access',
    tiers: [
      { title: 'starter', value: false },
      { title: 'popular', featured: true, value: true },
      { title: 'intermediate', value: false },
    ],
  },
];
const perks = [
  {
    title: '24/7 customer support',
    tiers: [
      { title: 'starter', value: true },
      { title: 'popular', featured: true, value: true },
      { title: 'intermediate', value: true },
    ],
  },
  {
    title: 'Instant notifications',
    tiers: [
      { title: 'starter', value: true },
      { title: 'popular', featured: true, value: true },
      { title: 'intermediate', value: true },
    ],
  },
  {
    title: 'Budgeting tools',
    tiers: [
      { title: 'starter', value: true },
      { title: 'popular', featured: true, value: true },
      { title: 'intermediate', value: true },
    ],
  },
  {
    title: 'Digital receipts',
    tiers: [
      { title: 'starter', value: true },
      { title: 'popular', featured: true, value: true },
      { title: 'intermediate', value: true },
    ],
  },
  {
    title: 'Pots to separate money',
    tiers: [
      { title: 'starter', value: false },
      { title: 'popular', featured: true, value: true },
      { title: 'intermediate', value: true },
    ],
  },
  {
    title: 'Free bank transfers',
    tiers: [
      { title: 'starter', value: false },
      { title: 'popular', featured: true, value: true },
      { title: 'intermediate', value: false },
    ],
  },
  {
    title: 'Business debit card',
    tiers: [
      { title: 'starter', value: false },
      { title: 'popular', featured: true, value: true },
      { title: 'intermediate', value: false },
    ],
  },
];

export const dynamic = 'force-static';

export default function Page() {
  return (
    <div>
      <div className="relative bg-indigo-600">
        {/* Overlapping background */}
        <div aria-hidden="true" className="absolute bottom-0 hidden h-6 w-full bg-gray-50 lg:block" />

        <div className="relative mx-auto max-w-2xl px-6 pt-16 text-center sm:pt-32 lg:max-w-7xl lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            <span className="block lg:inline">Simple pricing,</span>
            <span className="block lg:inline">no commitment.</span>
          </h1>
          <p className="mt-4 text-xl text-indigo-100">Everything you need, nothing you don&apos;t. Pick a plan that best suits your business.</p>
        </div>

        <h2 className="sr-only">Plans</h2>

        {/* Toggle */}
        <div className="relative mt-12 flex justify-center sm:mt-16">
          <div className="flex rounded-lg bg-indigo-700 p-0.5">
            <button type="button" className="relative whitespace-nowrap rounded-md border-indigo-700 bg-white px-6 py-2 text-sm font-medium text-indigo-700 shadow-sm hover:bg-indigo-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700">
              Monthly billing
            </button>
            <button type="button" className="relative ml-0.5 whitespace-nowrap rounded-md border border-transparent px-6 py-2 text-sm font-medium text-indigo-200 hover:bg-indigo-800 focus:z-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700">
              Yearly billing
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="relative mx-auto mt-8 max-w-2xl px-6 pb-8 sm:mt-12 lg:max-w-7xl lg:px-8 lg:pb-0">
          {/* Decorative background */}
          <div aria-hidden="true" className="absolute inset-0 bottom-6 left-8 right-8 top-4 hidden rounded-tl-lg rounded-tr-lg bg-indigo-700 lg:block" />

          <div className="relative space-y-6 lg:grid lg:grid-cols-3 lg:space-y-0">
            {plans.map((plan) => (
              <div key={plan.title} className={cn(plan.featured ? 'bg-white shadow-md ring-2 ring-indigo-700' : 'bg-indigo-700 lg:bg-transparent', 'rounded-lg px-6 pt-6 pb-3 lg:px-8 lg:pt-12')}>
                <div>
                  <h3 className={cn(plan.featured ? 'text-indigo-600' : 'text-white', 'text-base font-semibold')}>{plan.title}</h3>
                  <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-start">
                    <div className="mt-3 flex items-center">
                      <p className={cn(plan.featured ? 'text-indigo-600' : 'text-white', 'text-4xl font-bold tracking-tight')}>${plan.priceMonthly}</p>
                      <div className="ml-4">
                        <p className={cn(plan.featured ? 'text-gray-700' : 'text-white', 'text-sm')}>USD / mo</p>
                        <p className={cn(plan.featured ? 'text-gray-500' : 'text-indigo-200', 'text-sm')}>Billed yearly (${plan.priceYearly})</p>
                      </div>
                    </div>
                    <a href="#" className={cn(plan.featured ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-white text-indigo-600 hover:bg-indigo-50', 'mt-6 inline-block w-full rounded-md border border-transparent py-2 px-8 text-center text-sm font-medium shadow-sm sm:mt-0 sm:w-auto lg:mt-6 lg:w-full')}>
                      Buy {plan.title}
                    </a>
                  </div>
                </div>
                <h4 className="sr-only">Features</h4>
                <ul role="list" className={cn(plan.featured ? 'divide-gray-200 border-gray-200' : 'divide-indigo-500 divide-opacity-75 border-indigo-500', 'mt-7 divide-y border-t lg:border-t-0')}>
                  {plan.mainFeatures.map((mainFeature) => (
                    <li key={mainFeature.id} className="flex items-center py-3">
                      <CheckIcon className={cn(plan.featured ? 'text-indigo-500' : 'text-indigo-200', 'h-5 w-5 flex-shrink-0')} aria-hidden="true" />
                      <span className={cn(plan.featured ? 'text-gray-600' : 'text-white', 'ml-4 text-sm font-medium')}>{mainFeature.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature comparison */}
      <section aria-labelledby="mobile-comparison-heading" className="lg:hidden">
        <h2 id="mobile-comparison-heading" className="sr-only">
          Feature comparison
        </h2>

        <div className="mx-auto mt-16 max-w-2xl space-y-16 px-6">
          {plans.map((plan, planIndex) => (
            <div key={plan.title} className="border-t border-gray-200">
              <div className={cn(plan.featured ? 'border-indigo-600' : 'border-transparent', '-mt-px border-t-2 pt-6 sm:w-1/2')}>
                <h3 className={cn(plan.featured ? 'text-indigo-600' : 'text-gray-900', 'text-sm font-bold')}>{plan.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
              </div>
              <h4 className="mt-10 text-sm font-bold text-gray-900">Catered for business</h4>

              <div className="relative mt-6">
                {/* Fake card background */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden sm:block">
                  <div className={cn(plan.featured ? 'shadow-md' : 'shadow', 'absolute right-0 h-full w-1/2 rounded-lg bg-white')} />
                </div>

                <div className={cn(plan.featured ? 'shadow-md ring-2 ring-indigo-600' : 'shadow ring-1 ring-black ring-opacity-5', 'relative rounded-lg bg-white py-3 px-4 sm:rounded-none sm:bg-transparent sm:p-0 sm:shadow-none sm:ring-0')}>
                  <dl className="divide-y divide-gray-200">
                    {features.map((feature) => (
                      <div key={feature.title} className="flex items-center justify-between py-3 sm:grid sm:grid-cols-2">
                        <dt className="pr-4 text-sm font-medium text-gray-600">{feature.title}</dt>
                        <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                          {typeof feature.tiers[planIndex].value === 'string' ? (
                            <span className={cn(feature.tiers[planIndex].featured ? 'text-indigo-600' : 'text-gray-900', 'text-sm font-medium')}>{feature.tiers[planIndex].value}</span>
                          ) : (
                            <>
                              {feature.tiers[planIndex].value === true ? <CheckIcon className="mx-auto h-5 w-5 text-indigo-600" aria-hidden="true" /> : <XMarkIcon className="mx-auto h-5 w-5 text-gray-400" aria-hidden="true" />}

                              <span className="sr-only">{feature.tiers[planIndex].value === true ? 'Yes' : 'No'}</span>
                            </>
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Fake card border */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden sm:block">
                  <div className={cn(plan.featured ? 'ring-2 ring-indigo-600' : 'ring-1 ring-black ring-opacity-5', 'absolute right-0 h-full w-1/2 rounded-lg')} />
                </div>
              </div>

              <h4 className="mt-10 text-sm font-bold text-gray-900">Other perks</h4>

              <div className="relative mt-6">
                {/* Fake card background */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden sm:block">
                  <div className={cn(plan.featured ? 'shadow-md' : 'shadow', 'absolute right-0 h-full w-1/2 rounded-lg bg-white')} />
                </div>

                <div className={cn(plan.featured ? 'shadow-md ring-2 ring-indigo-600' : 'shadow ring-1 ring-black ring-opacity-5', 'relative rounded-lg bg-white py-3 px-4 sm:rounded-none sm:bg-transparent sm:p-0 sm:shadow-none sm:ring-0')}>
                  <dl className="divide-y divide-gray-200">
                    {perks.map((perk) => (
                      <div key={perk.title} className="flex justify-between py-3 sm:grid sm:grid-cols-2">
                        <dt className="text-sm font-medium text-gray-600 sm:pr-4">{perk.title}</dt>
                        <dd className="text-center sm:px-4">
                          {perk.tiers[planIndex].value === true ? <CheckIcon className="mx-auto h-5 w-5 text-indigo-600" aria-hidden="true" /> : <XMarkIcon className="mx-auto h-5 w-5 text-gray-400" aria-hidden="true" />}

                          <span className="sr-only">{perk.tiers[planIndex].value === true ? 'Yes' : 'No'}</span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Fake card border */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden sm:block">
                  <div className={cn(plan.featured ? 'ring-2 ring-indigo-600' : 'ring-1 ring-black ring-opacity-5', 'absolute right-0 h-full w-1/2 rounded-lg')} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="comparison-heading" className="hidden lg:block">
        <h2 id="comparison-heading" className="sr-only">
          Feature comparison
        </h2>

        <div className="mx-auto mt-24 max-w-7xl px-8">
          <div className="flex w-full items-stretch border-t border-gray-200">
            <div className="-mt-px flex w-1/4 items-end py-6 pr-4">
              <h3 className="mt-auto text-sm font-bold text-gray-900">Catered for business</h3>
            </div>
            {plans.map((plan, index) => (
              <div key={plan.title} aria-hidden="true" className={cn(index === plans.length - 1 ? '' : 'pr-4', '-mt-px w-1/4 pl-4')}>
                <div className={cn(plan.featured ? 'border-indigo-600' : 'border-transparent', 'border-t-2 py-6')}>
                  <p className={cn(plan.featured ? 'text-indigo-600' : 'text-gray-900', 'text-sm font-bold')}>{plan.title}</p>
                  <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative">
            {/* Fake card backgrounds */}
            <div className="pointer-events-none absolute inset-0 flex items-stretch" aria-hidden="true">
              <div className="w-1/4 pr-4" />
              <div className="w-1/4 px-4">
                <div className="h-full w-full rounded-lg bg-white shadow" />
              </div>
              <div className="w-1/4 px-4">
                <div className="h-full w-full rounded-lg bg-white shadow-md" />
              </div>
              <div className="w-1/4 pl-4">
                <div className="h-full w-full rounded-lg bg-white shadow" />
              </div>
            </div>

            <table className="relative w-full">
              <caption className="sr-only">Business feature comparison</caption>
              <thead>
                <tr className="text-left">
                  <th scope="col">
                    <span className="sr-only">Feature</span>
                  </th>
                  {plans.map((plan) => (
                    <th key={plan.title} scope="col">
                      <span className="sr-only">{plan.title} plan</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {features.map((feature) => (
                  <tr key={feature.title}>
                    <th scope="row" className="w-1/4 py-3 pr-4 text-left text-sm font-medium text-gray-600">
                      {feature.title}
                    </th>
                    {feature.tiers.map((tier, index) => (
                      <td key={tier.title} className={cn(index === feature.tiers.length - 1 ? 'pl-4' : 'px-4', 'relative w-1/4 py-0 text-center')}>
                        <span className="relative h-full w-full py-3">
                          {typeof tier.value === 'string' ? (
                            <span className={cn(tier.featured ? 'text-indigo-600' : 'text-gray-900', 'text-sm font-medium')}>{tier.value}</span>
                          ) : (
                            <>
                              {tier.value === true ? <CheckIcon className="mx-auto h-5 w-5 text-indigo-600" aria-hidden="true" /> : <XMarkIcon className="mx-auto h-5 w-5 text-gray-400" aria-hidden="true" />}

                              <span className="sr-only">{tier.value === true ? 'Yes' : 'No'}</span>
                            </>
                          )}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Fake card borders */}
            <div className="pointer-events-none absolute inset-0 flex items-stretch" aria-hidden="true">
              <div className="w-1/4 pr-4" />
              <div className="w-1/4 px-4">
                <div className="h-full w-full rounded-lg ring-1 ring-black ring-opacity-5" />
              </div>
              <div className="w-1/4 px-4">
                <div className="h-full w-full rounded-lg ring-2 ring-indigo-600 ring-opacity-100" />
              </div>
              <div className="w-1/4 pl-4">
                <div className="h-full w-full rounded-lg ring-1 ring-black ring-opacity-5" />
              </div>
            </div>
          </div>

          <h3 className="mt-10 text-sm font-bold text-gray-900">Other perks</h3>

          <div className="relative mt-6">
            {/* Fake card backgrounds */}
            <div className="pointer-events-none absolute inset-0 flex items-stretch" aria-hidden="true">
              <div className="w-1/4 pr-4" />
              <div className="w-1/4 px-4">
                <div className="h-full w-full rounded-lg bg-white shadow" />
              </div>
              <div className="w-1/4 px-4">
                <div className="h-full w-full rounded-lg bg-white shadow-md" />
              </div>
              <div className="w-1/4 pl-4">
                <div className="h-full w-full rounded-lg bg-white shadow" />
              </div>
            </div>

            <table className="relative w-full">
              <caption className="sr-only">Perk comparison</caption>
              <thead>
                <tr className="text-left">
                  <th scope="col">
                    <span className="sr-only">Perk</span>
                  </th>
                  {plans.map((plan) => (
                    <th key={plan.title} scope="col">
                      <span className="sr-only">{plan.title} plan</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {perks.map((perk) => (
                  <tr key={perk.title}>
                    <th scope="row" className="w-1/4 py-3 pr-4 text-left text-sm font-medium text-gray-600">
                      {perk.title}
                    </th>
                    {perk.tiers.map((tier, index) => (
                      <td key={tier.title} className={cn(index === perk.tiers.length - 1 ? 'pl-4' : 'px-4', 'relative w-1/4 py-0 text-center')}>
                        <span className="relative h-full w-full py-3">
                          {tier.value === true ? <CheckIcon className="mx-auto h-5 w-5 text-indigo-600" aria-hidden="true" /> : <XMarkIcon className="mx-auto h-5 w-5 text-gray-400" aria-hidden="true" />}

                          <span className="sr-only">{tier.value === true ? 'Yes' : 'No'}</span>
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Fake card borders */}
            <div className="pointer-events-none absolute inset-0 flex items-stretch" aria-hidden="true">
              <div className="w-1/4 pr-4" />
              <div className="w-1/4 px-4">
                <div className="h-full w-full rounded-lg ring-1 ring-black ring-opacity-5" />
              </div>
              <div className="w-1/4 px-4">
                <div className="h-full w-full rounded-lg ring-2 ring-indigo-600 ring-opacity-100" />
              </div>
              <div className="w-1/4 pl-4">
                <div className="h-full w-full rounded-lg ring-1 ring-black ring-opacity-5" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
