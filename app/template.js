"use client";

export default function Template({
  children
}) {

  return (

    <div className="animate-page">

      {children}

      <style jsx global>{`

        .animate-page {

          animation:
            pageEnter 0.35s ease;

        }

        @keyframes pageEnter {

          0% {

            opacity: 0;

            transform:
              translateY(12px)
              scale(0.98);

          }

          100% {

            opacity: 1;

            transform:
              translateY(0)
              scale(1);

          }

        }

      `}</style>

    </div>

  );

}