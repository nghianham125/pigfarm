// components/AppLayout.js
"use client"; // Đánh dấu là client component

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Sử dụng next/navigation
import Loading from "@/app/admin/components/app.loading";

const AppLayout = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    // Theo dõi khi router push hoặc replace
    const handleRouteChange = (url) => {
      console.log('Loading: ', url);
      handleStart();
      setTimeout(handleComplete, 500); // Giả lập thời gian loading
    };

    // Ghi đè phương thức router.push và router.replace
    const originalPush = router.push;
    router.push = (...args) => {
      handleRouteChange(...args);
      return originalPush.apply(router, args);
    };

    const originalReplace = router.replace;
    router.replace = (...args) => {
      handleRouteChange(...args);
      return originalReplace.apply(router, args);
    };

    return () => {
      router.push = originalPush;
      router.replace = originalReplace;
    };
  }, [router]);

  return (
    <>
      {loading ? <Loading /> : children}
    </>
  );
};

export default AppLayout;
