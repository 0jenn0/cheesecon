export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='padding-y-0 tablet:padding-y-12 flex h-full w-full flex-col items-center gap-12'>
      {children}
    </div>
  );
}
