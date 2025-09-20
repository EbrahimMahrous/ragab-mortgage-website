// components/Location.tsx
export default function Location() {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
          My Location in Dubai
        </h2>
        
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="bg-gray-200 dark:bg-gray-700 h-64 md:h-96 rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462562.650949303!2d54.94755455000001!3d25.07575945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1710864000000!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Dubai Location"
              ></iframe>
            </div>
          </div>
          
          <div className="md:w-1/2 md:pl-12">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Office Address
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              I'm based in Dubai and serve clients across the UAE. Whether you're a resident or non-resident, 
              I can help you navigate the UAE mortgage market and find the best financing solutions for your needs.
            </p>
            
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium text-gray-800 dark:text-white">Address:</span> Business Bay, Dubai, UAE
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium text-gray-800 dark:text-white">Phone:</span> +971 XX XXX XXXX
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium text-gray-800 dark:text-white">Email:</span> info@ragabmortgage.com
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium text-gray-800 dark:text-white">Working Hours:</span> Sunday - Thursday, 9AM - 6PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}