
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Страховая платформа
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Быстрое и удобное оформление страховых полисов онлайн
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">ОСАГО</h3>
              <p className="text-gray-600 mb-4">Обязательное страхование автогражданской ответственности</p>
              <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors">
                Оформить
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">КАСКО</h3>
              <p className="text-gray-600 mb-4">Добровольное страхование автотранспорта</p>
              <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors">
                Оформить
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Недвижимость</h3>
              <p className="text-gray-600 mb-4">Страхование квартир и домов</p>
              <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors">
                Оформить
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

