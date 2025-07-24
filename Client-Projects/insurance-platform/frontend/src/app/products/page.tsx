
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { productsAPI, applicationsAPI, Product, ApplicationData } from '@/lib/api';

export default function ProductPage() {
  const params = useParams();
  const productName = params.name as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [applicationNumber, setApplicationNumber] = useState('');

  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    birth_date: '',
    comment: '',
    personal_data_consent: false,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productsAPI.getByName(productName);
        setProduct(response.data);
      } catch (error) {
        console.error('Ошибка загрузки продукта:', error);
      } finally {
        setLoading(false);
      }
    };

    if (productName) {
      fetchProduct();
    }
  }, [productName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const applicationData: ApplicationData = {
        product: product!.id,
        ...formData,
        personal_data_consent: formData.personal_data_consent,
      };

      const response = await applicationsAPI.create(applicationData);
      setApplicationNumber(response.data.application_number);
      setSuccess(true);
    } catch (error) {
      console.error('Ошибка отправки заявки:', error);
      alert('Ошибка при отправке заявки. Попробуйте еще раз.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Продукт не найден</h1>
          <a href="/" className="text-blue-600 hover:underline">Вернуться на главную</a>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Заявка отправлена!</h2>
          <p className="text-gray-600 mb-4">
            Ваша заявка успешно принята к рассмотрению.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-blue-800">
              <strong>Номер заявки:</strong> {applicationNumber}
            </p>
          </div>
          <div className="space-y-3">
            <a 
              href="/" 
              className="block w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Вернуться на главную
            </a>
            <button 
              onClick={() => {setSuccess(false); setFormData({full_name: '', phone: '', email: '', birth_date: '', comment: '', personal_data_consent: false});}}
              className="block w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
            >
              Подать еще одну заявку
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.display_name}</h1>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2">
                ФИО *
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                required
                value={formData.full_name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Иванов Иван Иванович"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Телефон *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+7 (900) 123-45-67"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ivan@example.com"
              />
            </div>

            <div>
              <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700 mb-2">
                Дата рождения *
              </label>
              <input
                type="date"
                id="birth_date"
                name="birth_date"
                required
                value={formData.birth_date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                Комментарий
              </label>
              <textarea
                id="comment"
                name="comment"
                rows={4}
                value={formData.comment}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Дополнительная информация..."
              />
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="personal_data_consent"
                name="personal_data_consent"
                required
                checked={formData.personal_data_consent}
                onChange={handleInputChange}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="personal_data_consent" className="ml-2 text-sm text-gray-700">
                Я согласен на обработку персональных данных *
              </label>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {submitting ? 'Отправка...' : 'Подать заявку'}
              </button>
              <a
                href="/"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Отмена
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
