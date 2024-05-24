import NavBar from '@/components/nav-bar';

export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}
