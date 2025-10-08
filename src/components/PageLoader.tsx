const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 gradient-hero flex items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-primary rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
