import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Trophy, CheckCircle, Share2, Home, AlertCircle, Smartphone } from 'lucide-react';

type Step = 'celebration' | 'form' | 'success';

// Simple Confetti Component
const Confetti = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-[#22C55E]"
          initial={{
            x: '50vw',
            y: '50vh',
            scale: 0,
            opacity: 1
          }}
          animate={{
            x: `${Math.random() * 100}vw`,
            y: `${Math.random() * 100}vh`,
            scale: [0, 1.5, 0],
            opacity: [1, 1, 0]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            ease: "easeOut",
            delay: Math.random() * 0.5
          }}
        />
      ))}
    </div>
  );
};

export function RewardClaim() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('celebration');
  const [agreed, setAgreed] = useState(false);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (step === 'celebration') {
      const timer = setTimeout(() => {
        setStep('form');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleSubmit = () => {
    if (!agreed || !phone || !name) return;
    setStep('success');
  };

  const getFutureDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  return (
    <div className="w-full min-h-[100dvh] bg-slate-50 flex items-center justify-center font-['Pretendard',_sans-serif]">
      <div className="relative w-full max-w-md h-[100dvh] bg-[#FFFFFF] overflow-x-hidden overflow-y-auto hide-scrollbar flex flex-col text-[#0F172A] shadow-[0_8px_30px_rgba(15,23,42,0.06)] md:rounded-[40px] md:border border-[#E2E8F0]">

        <AnimatePresence mode="wait">

          {/* CELEBRATION STATE */}
          {step === 'celebration' && (
            <motion.div
              key="celebration"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-white z-50"
            >
              <Confetti />

              <motion.div
                initial={{ scale: 0, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="relative mb-6"
              >
                <div className="absolute inset-0 bg-[#22C55E] blur-2xl opacity-20 rounded-full" />
                <Trophy size={80} className="text-[#22C55E] relative z-10" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-[32px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00C896] to-[#22C55E] mb-3 tracking-tight text-center"
              >
                10연승 달성!
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-[16px] text-[#0F172A] text-center px-6 font-medium"
              >
                축하합니다!<br/>40만원 리워드 신청 자격이 생겼어요
              </motion.p>
            </motion.div>
          )}

          {/* FORM STATE */}
          {step === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col h-full"
            >
              <header className="h-[56px] flex items-center px-4 bg-white border-b border-[#E2E8F0] shrink-0 sticky top-0 z-20">
                <button
                  onClick={() => navigate(-1)}
                  className="w-10 h-10 flex items-center justify-center -ml-2 text-[#0F172A] hover:bg-slate-50 rounded-full transition-colors"
                >
                  <ChevronLeft size={24} strokeWidth={2} />
                </button>
                <h1 className="text-[18px] font-semibold tracking-tight ml-2">리워드 신청</h1>
              </header>

              <div className="flex-1 pb-44 overflow-y-auto">
                {/* Header Info */}
                <div className="p-6 pb-4 text-center flex flex-col items-center">
                  <div className="bg-gradient-to-r from-[#00C896] to-[#22C55E] text-white px-5 py-3 rounded-[16px] font-bold text-[24px] mb-3 font-['DM_Mono'] tracking-tight shadow-[0_8px_20px_rgba(0,200,150,0.25)]">
                    400,000원
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <img src="data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='24' height='24' rx='4' fill='%2303C75A'/%3E%3Cpath d='M8 12L11 15L16 9' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E" alt="Naver Pay" className="w-6 h-6" />
                    <p className="text-[16px] font-bold text-[#0F172A]">네이버페이로 전액 지급</p>
                  </div>
                  <p className="text-[13px] text-[#64748B]">신청 후 1-3 영업일 내 지급됩니다</p>
                </div>

                {/* Form */}
                <div className="px-5 mt-4">
                  {/* Info Banner */}
                  <div className="bg-[#F0FDF4] border border-[#00C896] rounded-[14px] p-4 mb-6 flex items-start gap-3">
                    <AlertCircle size={18} className="text-[#00C896] shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-[13px] text-[#0F172A] leading-relaxed">
                        <span className="font-semibold">네이버페이 간편송금</span>으로 지급됩니다.
                        네이버페이 앱에서 수신 확인 후 본인 계좌로 출금 가능합니다.
                      </p>
                    </div>
                  </div>

                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
                    <div>
                      <label className="block text-[13px] font-medium text-[#64748B] mb-1.5 ml-1">
                        휴대폰 번호 (네이버페이 연결 번호)
                      </label>
                      <div className="relative">
                        <Smartphone size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                        <input
                          type="tel"
                          placeholder="01012345678 (- 없이 입력)"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                          maxLength={11}
                          className="w-full h-[56px] pl-12 pr-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] text-[15px] text-[#0F172A] font-['DM_Mono'] outline-none focus:border-[#2563EB] transition-colors placeholder:text-[#94A3B8] placeholder:font-sans"
                        />
                      </div>
                      <p className="text-[12px] text-[#64748B] mt-2 ml-1 flex items-start gap-1.5">
                        <span className="text-[#2563EB] font-bold">•</span>
                        <span>네이버페이에 등록된 휴대폰 번호를 입력해주세요.</span>
                      </p>
                    </div>

                    <div>
                      <label className="block text-[13px] font-medium text-[#64748B] mb-1.5 ml-1">
                        이름 (실명 확인용)
                      </label>
                      <input
                        type="text"
                        placeholder="홍길동"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-[56px] px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] text-[15px] text-[#0F172A] outline-none focus:border-[#2563EB] transition-colors placeholder:text-[#94A3B8]"
                      />
                      <p className="text-[12px] text-[#64748B] mt-2 ml-1 flex items-start gap-1.5">
                        <span className="text-[#2563EB] font-bold">•</span>
                        <span>본인 확인을 위해 실명을 입력해주세요.</span>
                      </p>
                    </div>
                  </motion.div>

                  {/* Naver Pay Info Box */}
                  <div className="mt-8 bg-[#DBEAFE] border border-[#2563EB] rounded-[16px] p-5">
                    <h4 className="text-[14px] font-semibold text-[#0F172A] mb-3 flex items-center gap-2">
                      <img src="data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='24' height='24' rx='4' fill='%2303C75A'/%3E%3Cpath d='M8 12L11 15L16 9' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E" alt="Naver Pay" className="w-5 h-5" />
                      <span>네이버페이 지급 안내</span>
                    </h4>
                    <ul className="text-[13px] text-[#0F172A] space-y-2.5">
                      <li className="flex items-start gap-2">
                        <span className="text-[#00C896] font-bold mt-0.5">✓</span>
                        <span><span className="font-semibold">세금 없이 전액 40만원</span>이 지급됩니다.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#00C896] font-bold mt-0.5">✓</span>
                        <span>신청 후 <span className="font-semibold">1-3 영업일 내</span> 네이버페이로 입금됩니다.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#00C896] font-bold mt-0.5">✓</span>
                        <span>네이버페이 앱에서 수신 확인 후 본인 계좌로 출금 가능합니다.</span>
                      </li>
                    </ul>
                    <div className="mt-4 pt-4 border-t border-[#BFDBFE]">
                      <p className="text-[12px] text-[#64748B]">
                        * 네이버페이 간편송금은 소득세법상 과세 대상이 아니므로 세금이 부과되지 않습니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Sticky Action */}
              <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] px-5 py-4 pb-8 z-30">
                <label className="flex items-center gap-3 mb-4 cursor-pointer">
                  <div
                    className={`w-5 h-5 rounded-[6px] border flex items-center justify-center shrink-0 transition-colors ${agreed ? 'bg-[#2563EB] border-[#2563EB]' : 'border-[#CBD5E1] bg-white'}`}
                    onClick={() => setAgreed(!agreed)}
                  >
                    {agreed && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                  </div>
                  <span className="text-[14px] text-[#0F172A] select-none" onClick={() => setAgreed(!agreed)}>
                    개인정보 수집 및 이용, 네이버페이 지급 안내에 동의합니다.
                  </span>
                </label>

                <button
                  onClick={handleSubmit}
                  disabled={!agreed || !phone || !name}
                  className={`w-full h-[56px] rounded-[14px] font-bold text-[16px] transition-all flex items-center justify-center
                    ${agreed && phone && name ? 'bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-[0_4px_12px_rgba(37,99,235,0.2)]' : 'bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed'}`}
                >
                  40만원 리워드 신청하기
                </button>
                <p className="text-[11px] text-[#EF4444] text-center mt-3 font-medium">
                  * 부정한 방법으로 참여가 적발될 경우 지급이 취소되며 계정이 정지됩니다.
                </p>
              </div>
            </motion.div>
          )}

          {/* SUCCESS STATE */}
          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center h-full px-6 bg-white"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="mb-6"
              >
                <CheckCircle size={72} className="text-[#00C896]" strokeWidth={1.5} />
              </motion.div>

              <h2 className="text-[24px] font-bold text-[#0F172A] mb-2">신청이 완료되었습니다!</h2>
              <p className="text-[15px] text-[#64748B] text-center mb-10">
                영업일 기준 72시간 내 처리될 예정입니다.<br/>
                <span className="font-semibold text-[#0F172A] mt-1 inline-block">예상 완료일: {getFutureDate()}</span>
              </p>

              {/* Stepper */}
              <div className="w-full max-w-[280px] bg-[#F8FAFC] p-6 rounded-[20px] border border-[#E2E8F0] mb-12">
                <div className="relative flex justify-between items-center z-10">
                  {/* Progress Line */}
                  <div className="absolute left-[15%] right-[15%] top-4 h-[2px] bg-[#E2E8F0] -z-10" />
                  <div className="absolute left-[15%] right-[50%] top-4 h-[2px] bg-[#2563EB] -z-10" />

                  {/* Step 1 */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#00C896] text-white flex items-center justify-center font-bold text-[14px]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span className="text-[12px] font-bold text-[#00C896]">신청완료</span>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white border-2 border-[#2563EB] text-[#2563EB] flex items-center justify-center font-bold text-[14px] shadow-sm">
                      2
                    </div>
                    <span className="text-[12px] font-bold text-[#2563EB]">검토중</span>
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#F8FAFC] border-2 border-[#CBD5E1] text-[#94A3B8] flex items-center justify-center font-bold text-[14px]">
                      3
                    </div>
                    <span className="text-[12px] font-medium text-[#94A3B8]">지급완료</span>
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col gap-3">
                <button
                  onClick={() => navigate('/home')}
                  className="w-full h-[56px] bg-[#2563EB] text-white rounded-[14px] font-bold text-[16px] flex items-center justify-center gap-2 hover:bg-[#1D4ED8] transition-colors"
                >
                  <Home size={20} />
                  홈으로 돌아가기
                </button>
                <button
                  className="w-full h-[56px] bg-white border-2 border-[#2563EB] text-[#2563EB] rounded-[14px] font-bold text-[16px] flex items-center justify-center gap-2 hover:bg-[#DBEAFE] transition-colors"
                >
                  <Share2 size={20} />
                  친구에게 자랑하기
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
