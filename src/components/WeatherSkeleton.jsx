function WeatherSkeleton({ isDarkMode }) {
  return (
    <div
      className={`mt-8 rounded-2xl p-6 shadow-md ${
        isDarkMode
          ? 'bg-slate-800'
          : 'bg-white'
      }`}
    >

      {/* Top section */}
      <div className='flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between'>

        {/* Location skeleton */}
        <div className='space-y-3'>

          <div className='h-4 w-20 animate-pulse rounded bg-slate-300' />

          <div className='h-9 w-32 animate-pulse rounded bg-slate-300' />

          <div className='h-6 w-28 animate-pulse rounded bg-slate-300' />

        </div>


        {/* Temperature skeleton */}
        <div className='space-y-3 sm:text-right'>

          <div className='h-16 w-48 animate-pulse rounded bg-slate-300' />

          <div className='ml-auto h-5 w-28 animate-pulse rounded bg-slate-300' />

        </div>

      </div>


      {/* Weather details skeleton */}
      <div className='mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3'>

        <div className='h-24 animate-pulse rounded-xl bg-slate-300' />

        <div className='h-24 animate-pulse rounded-xl bg-slate-300' />

        <div className='h-24 animate-pulse rounded-xl bg-slate-300' />

      </div>

    </div>
  )
}

export default WeatherSkeleton