import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const rouletteNumbers = [
  { number: 0, color: 'green' },
  { number: 32, color: 'red' }, { number: 15, color: 'black' }, { number: 19, color: 'red' },
  { number: 4, color: 'black' }, { number: 21, color: 'red' }, { number: 2, color: 'black' },
  { number: 25, color: 'red' }, { number: 17, color: 'black' }, { number: 34, color: 'red' },
  { number: 6, color: 'black' }, { number: 27, color: 'red' }, { number: 13, color: 'black' },
  { number: 36, color: 'red' }, { number: 11, color: 'black' }, { number: 30, color: 'red' },
  { number: 8, color: 'black' }, { number: 23, color: 'red' }, { number: 10, color: 'black' },
  { number: 5, color: 'red' }, { number: 24, color: 'black' }, { number: 16, color: 'red' },
  { number: 33, color: 'black' }, { number: 1, color: 'red' }, { number: 20, color: 'black' },
  { number: 14, color: 'red' }, { number: 31, color: 'black' }, { number: 9, color: 'red' },
  { number: 22, color: 'black' }, { number: 18, color: 'red' }, { number: 29, color: 'black' },
  { number: 7, color: 'red' }, { number: 28, color: 'black' }, { number: 12, color: 'red' },
  { number: 35, color: 'black' }, { number: 3, color: 'red' }, { number: 26, color: 'black' }
];

const menuItems = [
  { name: 'Главная', icon: 'Home' },
  { name: 'Игры', icon: 'Gamepad2' },
  { name: 'Рулетка', icon: 'CircleDot' },
  { name: 'Пополнение', icon: 'CreditCard' },
  { name: 'Вывод', icon: 'Banknote' },
  { name: 'Профиль', icon: 'User' },
  { name: 'Правила', icon: 'BookOpen' },
  { name: 'Поддержка', icon: 'MessageCircle' }
];

const Index = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [balance, setBalance] = useState(15000);
  const [currentBet, setCurrentBet] = useState(100);
  const [winningNumber, setWinningNumber] = useState<number | null>(null);
  const [betType, setBetType] = useState<'red' | 'black' | 'number' | null>(null);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

  const quickBets = [10, 50, 100, 500, 1000, 5000];

  const spinRoulette = () => {
    if (isSpinning || !betType) return;
    
    setIsSpinning(true);
    setBalance(prev => prev - currentBet);
    
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * rouletteNumbers.length);
      const winner = rouletteNumbers[randomIndex];
      setWinningNumber(winner.number);
      
      // Проверяем выигрыш
      let winAmount = 0;
      if (betType === 'number' && selectedNumber === winner.number) {
        winAmount = currentBet * 36; // Выплата 35:1
      } else if (betType === winner.color && winner.number !== 0) {
        winAmount = currentBet * 2; // Выплата 1:1
      }
      
      if (winAmount > 0) {
        setBalance(prev => prev + winAmount);
      }
      
      setIsSpinning(false);
      setBetType(null);
      setSelectedNumber(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Навигация */}
      <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-pink to-neon-cyan flex items-center justify-center animate-pulse-glow">
                <Icon name="CircleDot" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-pink to-neon-gold bg-clip-text text-transparent">
                CASINO ROULETTE
              </h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-neon-pink/20 transition-all duration-300 hover:shadow-lg hover:shadow-neon-pink/25"
                >
                  <Icon name={item.icon as any} size={18} />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="border-neon-gold text-neon-gold text-lg px-4 py-2">
                💰 {balance.toLocaleString()} ₽
              </Badge>
              <Button className="bg-gradient-to-r from-neon-pink to-neon-cyan hover:from-neon-cyan hover:to-neon-pink">
                <Icon name="User" size={18} className="mr-2" />
                Профиль
              </Button>
            </div>
          </div>
          
          {/* Мобильное меню */}
          <div className="md:hidden mt-4 grid grid-cols-4 gap-2">
            {menuItems.map((item) => (
              <button
                key={item.name}
                className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-neon-pink/20"
              >
                <Icon name={item.icon as any} size={16} />
                <span className="text-xs">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Рулетка */}
          <div className="lg:col-span-2">
            <Card className="bg-black/80 border-gray-800 p-8 backdrop-blur-sm">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-neon-pink to-neon-cyan bg-clip-text text-transparent">
                  Европейская Рулетка
                </h2>
                
                {/* Колесо рулетки */}
                <div className="relative mx-auto w-80 h-80 mb-8">
                  <div 
                    className={`absolute inset-0 rounded-full border-8 border-neon-gold shadow-2xl shadow-neon-gold/50 ${isSpinning ? 'animate-spin-roulette' : ''}`}
                    style={{
                      background: `conic-gradient(${rouletteNumbers.map((item, index) => 
                        `${item.color === 'green' ? '#22c55e' : item.color === 'red' ? '#ef4444' : '#1f2937'} ${index * (360/37)}deg ${(index + 1) * (360/37)}deg`
                      ).join(', ')})`
                    }}
                  >
                    <div className="absolute inset-4 rounded-full bg-black flex items-center justify-center">
                      <div className="text-center">
                        {winningNumber !== null && (
                          <div className="animate-fade-in">
                            <div className={`text-4xl font-bold ${rouletteNumbers.find(n => n.number === winningNumber)?.color === 'red' ? 'text-red-500' : rouletteNumbers.find(n => n.number === winningNumber)?.color === 'green' ? 'text-green-500' : 'text-gray-300'}`}>
                              {winningNumber}
                            </div>
                            <div className="text-sm text-gray-400">
                              {rouletteNumbers.find(n => n.number === winningNumber)?.color}
                            </div>
                          </div>
                        )}
                        {isSpinning && (
                          <div className="animate-pulse text-neon-gold">
                            <Icon name="CircleDot" size={48} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Указатель */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                    <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-white"></div>
                  </div>
                </div>

                {/* Игровое поле */}
                <div className="grid grid-cols-12 gap-1 mb-6 max-w-4xl mx-auto">
                  {/* Зеро */}
                  <button
                    onClick={() => { setBetType('number'); setSelectedNumber(0); }}
                    className={`col-span-12 h-12 bg-green-600 hover:bg-green-500 rounded text-white font-bold transition-all ${selectedNumber === 0 ? 'ring-2 ring-neon-gold' : ''}`}
                  >
                    0
                  </button>
                  
                  {/* Числа 1-36 */}
                  {Array.from({ length: 36 }, (_, i) => i + 1).map((num) => {
                    const isRed = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(num);
                    return (
                      <button
                        key={num}
                        onClick={() => { setBetType('number'); setSelectedNumber(num); }}
                        className={`h-12 font-bold rounded transition-all ${
                          isRed 
                            ? 'bg-red-600 hover:bg-red-500 text-white' 
                            : 'bg-gray-800 hover:bg-gray-700 text-white'
                        } ${selectedNumber === num ? 'ring-2 ring-neon-gold' : ''}`}
                      >
                        {num}
                      </button>
                    );
                  })}
                </div>

                {/* Ставки на цвета */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button
                    onClick={() => setBetType('red')}
                    className={`h-16 bg-red-600 hover:bg-red-500 rounded-lg font-bold text-white transition-all ${betType === 'red' ? 'ring-2 ring-neon-gold' : ''}`}
                  >
                    КРАСНОЕ (2:1)
                  </button>
                  <button
                    onClick={() => setBetType('black')}
                    className={`h-16 bg-gray-800 hover:bg-gray-700 rounded-lg font-bold text-white transition-all ${betType === 'black' ? 'ring-2 ring-neon-gold' : ''}`}
                  >
                    ЧЕРНОЕ (2:1)
                  </button>
                </div>

                <Button
                  onClick={spinRoulette}
                  disabled={isSpinning || !betType}
                  className="w-full h-16 text-xl font-bold bg-gradient-to-r from-neon-pink to-neon-cyan hover:from-neon-cyan hover:to-neon-pink disabled:opacity-50 disabled:cursor-not-allowed animate-pulse-glow"
                >
                  {isSpinning ? 'КРУТИТСЯ...' : 'КРУТИТЬ РУЛЕТКУ'}
                </Button>
              </div>
            </Card>
          </div>

          {/* Панель ставок */}
          <div className="space-y-6">
            <Card className="bg-black/80 border-gray-800 p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4 text-neon-gold">Размер ставки</h3>
              
              <div className="grid grid-cols-3 gap-2 mb-4">
                {quickBets.map((bet) => (
                  <button
                    key={bet}
                    onClick={() => setCurrentBet(bet)}
                    className={`p-3 rounded font-bold transition-all ${
                      currentBet === bet 
                        ? 'bg-neon-pink text-white ring-2 ring-neon-gold' 
                        : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                    }`}
                  >
                    {bet}₽
                  </button>
                ))}
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-neon-gold mb-2">
                  {currentBet.toLocaleString()}₽
                </div>
                <div className="text-sm text-gray-400">
                  Текущая ставка
                </div>
              </div>
            </Card>

            <Card className="bg-black/80 border-gray-800 p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4 text-neon-cyan">Статистика</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Баланс:</span>
                  <span className="font-bold text-neon-gold">{balance.toLocaleString()}₽</span>
                </div>
                <div className="flex justify-between">
                  <span>Ставка:</span>
                  <span className="font-bold">{currentBet.toLocaleString()}₽</span>
                </div>
                <div className="flex justify-between">
                  <span>Тип ставки:</span>
                  <span className="font-bold text-neon-pink">
                    {betType === 'red' ? 'Красное' : betType === 'black' ? 'Черное' : betType === 'number' ? `Число ${selectedNumber}` : 'Не выбрано'}
                  </span>
                </div>
                {winningNumber !== null && (
                  <div className="flex justify-between text-neon-gold">
                    <span>Последний номер:</span>
                    <span className="font-bold">{winningNumber}</span>
                  </div>
                )}
              </div>
            </Card>

            <Card className="bg-black/80 border-gray-800 p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4 text-neon-cyan">Быстрые действия</h3>
              
              <div className="space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-500">
                  <Icon name="CreditCard" size={18} className="mr-2" />
                  Пополнить счет
                </Button>
                <Button className="w-full bg-orange-600 hover:bg-orange-500">
                  <Icon name="Banknote" size={18} className="mr-2" />
                  Вывести средства
                </Button>
                <Button className="w-full bg-blue-600 hover:bg-blue-500">
                  <Icon name="MessageCircle" size={18} className="mr-2" />
                  Поддержка 24/7
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;