import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  ChevronLeft,
  Coins,
  Gift,
  CheckCircle2,
  ArrowRight,
  Info,
  TrendingUp,
  TrendingDown,
  Clock,
} from "lucide-react";
import { BottomNav } from "../components/BottomNav";

interface ExchangeOption {
  id: string;
  points: number;
  cash: number;
  badge?: string;
  isPopular?: boolean;
}

interface PointHistory {
  id: string;
  type: 'earn' | 'use';
  points: number;
  description: string;
  date: string;
  status?: 'pending' | 'completed';
}

const EXCHANGE_OPTIONS: ExchangeOption[] = [
  { id: "1", points: 10000, cash: 10000 },
  {
    id: "2",
    points: 50000,
    cash: 50000,
    badge: "인기",
    isPopular: true,
  },
  { id: "3", points: 100000, cash: 100000 },
  {
    id: "4",
    points: 400000,
    cash: 400000,
    badge: "10연승 보상",
  },
];

const MOCK_HISTORY: PointHistory[] = [
  {
    id: '1',
    type: 'use',
    points: 50000,
    description: '네이버페이 교환',
    date: '2026-05-14',
    status: 'completed'
  },
  {
    id: '2',
    type: 'earn',
    points: 100,
    description: '삼성전자 예측 성공',
    date: '2026-05-13',
  },
  {
    id: '3',
    type: 'earn',
    points: 500,
    description: '5연승 보너스',
    date: '2026-05-13',
  },
  {
    id: '4',
    type: 'earn',
    points: 100,
    description: 'SK하이닉스 예측 성공',
    date: '2026-05-12',
  },
  {
    id: '5',
    type: 'use',
    points: 10000,
    description: '네이버페이 교환',
    date: '2026-05-10',
    status: 'pending'
  },
  {
    id: '6',
    type: 'earn',
    points: 100,
    description: 'NAVER 예측 성공',
    date: '2026-05-09',
  },
];

export function PointStore() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<
    string | null
  >(null);
  const [showConfirmModal, setShowConfirmModal] =
    useState(false);

  // Mock 사용자 포인트 (실제로는 API에서 가져옴)
  const userPoints = 127500;

  const handleExchange = (option: ExchangeOption) => {
    if (userPoints < option.points) {
      // 포인트 부족
      return;
    }
    setSelectedOption(option.id);
    setShowConfirmModal(true);
  };

  const confirmExchange = () => {
    setShowConfirmModal(false);
    // 실제로는 API 호출
    alert(
      "교환 신청이 완료되었습니다! 네이버페이로 지급됩니다.",
    );
  };

  const getSelectedOptionData = () => {
    return EXCHANGE_OPTIONS.find(
      (opt) => opt.id === selectedOption,
    );
  };

  return (
    <div className="w-full min-h-[100dvh] bg-slate-50 flex items-center justify-center font-['Pretendard',_sans-serif]">
      <div className="relative w-full max-w-md h-[100dvh] bg-[#F8FAFC] overflow-hidden flex flex-col text-[#0F172A] shadow-[0_8px_30px_rgba(15,23,42,0.06)] md:rounded-[40px] md:border border-[#E2E8F0]">
        {/* Header */}
        <header className="h-[56px] flex items-center px-4 bg-white border-b border-[#E2E8F0] shrink-0 z-20">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center -ml-2 text-[#0F172A] hover:bg-slate-50 rounded-full transition-colors"
          >
            <ChevronLeft size={24} strokeWidth={2} />
          </button>
          <h1 className="text-[18px] font-semibold tracking-tight ml-2">
            포인트 스토어
          </h1>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto hide-scrollbar pb-10">
          {/* 포인트 잔액 카드 */}
          <div className="p-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-[20px] p-6 shadow-[0_8px_24px_rgba(37,99,235,0.2)]"
            >
              <div className="flex items-center gap-2 mb-3">
                <Coins size={20} className="text-white" />
                <span className="text-[14px] text-white/90 font-medium">
                  내 포인트
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-[48px] font-extrabold text-white font-['DM_Mono'] tracking-tight leading-none">
                  {userPoints.toLocaleString()}
                </span>
                <span className="text-[18px] text-white/90 font-semibold mb-1">
                  P
                </span>
              </div>
              <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between">
                <span className="text-[13px] text-white/80">
                  10연승 달성 시 400,000P 지급
                </span>
                <Gift size={18} className="text-white/80" />
              </div>
            </motion.div>
          </div>

          {/* 교환 안내 */}
          <div className="px-4 mb-4">
            <div className="bg-[#FFFBEB] border border-[#F59E0B] rounded-[12px] p-3 px-4 flex items-start gap-2.5">
              <Info
                size={18}
                className="text-[#F59E0B] mt-0.5 shrink-0"
              />
              <div className="flex-1">
                <p className="text-[13px] text-[#0F172A] leading-relaxed">
                  포인트는{" "}
                  <span className="font-semibold">
                    네이버페이
                  </span>
                  로 교환할 수 있습니다. 교환 신청 후{" "}
                  <span className="font-semibold">
                    1-3 영업일
                  </span>{" "}
                  내 지급됩니다.
                </p>
              </div>
            </div>
          </div>

          {/* 교환 옵션 리스트 */}
          <div className="px-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[16px] font-bold text-[#0F172A]">
                교환 가능 금액
              </h2>
              <span className="text-[12px] text-[#64748B]">
                1P = 1원
              </span>
            </div>

            <div className="space-y-3">
              {EXCHANGE_OPTIONS.map((option, index) => {
                const canExchange = userPoints >= option.points;

                return (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() =>
                      canExchange && handleExchange(option)
                    }
                    className={`bg-white border-2 rounded-[16px] p-4 shadow-[0_2px_8px_rgba(15,23,42,0.04)] transition-all ${
                      option.isPopular
                        ? "border-[#2563EB]"
                        : canExchange
                          ? "border-[#E2E8F0] hover:border-[#2563EB] cursor-pointer"
                          : "border-[#E2E8F0] opacity-50 cursor-not-allowed"
                    } relative overflow-hidden`}
                  >
                    {/* 배지 */}
                    {option.badge && (
                      <div className="absolute top-3 right-3">
                        <span
                          className={`text-[11px] font-bold px-2 py-1 rounded-md ${
                            option.isPopular
                              ? "bg-[#2563EB] text-white"
                              : "bg-[#F59E0B] text-white"
                          }`}
                        >
                          {option.badge}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex-1 pr-4">
                        {/* 포인트 */}
                        <div className="flex items-baseline gap-1 mb-2">
                          <span className="text-[28px] font-extrabold text-[#0F172A] font-['DM_Mono'] tracking-tight leading-none">
                            {option.points.toLocaleString()}
                          </span>
                          <span className="text-[14px] font-semibold text-[#64748B]">
                            P
                          </span>
                        </div>

                        {/* 화살표 */}
                        <div className="flex items-center gap-2 mb-2">
                          <ArrowRight
                            size={16}
                            className="text-[#2563EB]"
                          />
                          <span className="text-[13px] text-[#64748B] font-medium">
                            네이버페이로 교환
                          </span>
                        </div>

                        {/* 금액 */}
                        <div className="flex items-baseline gap-1">
                          <span className="text-[24px] font-bold text-[#00C896] font-['DM_Mono'] tracking-tight leading-none">
                            {option.cash.toLocaleString()}
                          </span>
                          <span className="text-[14px] font-semibold text-[#64748B]">
                            원
                          </span>
                        </div>
                      </div>

                      {/* 교환 버튼 */}
                      <div>
                        {canExchange ? (
                          <motion.div
                            whileTap={{ scale: 0.95 }}
                            className="w-[68px] h-[68px] bg-[#2563EB] rounded-[14px] flex items-center justify-center shadow-[0_4px_12px_rgba(37,99,235,0.3)]"
                          >
                            <div className="flex flex-col items-center">
                              <ArrowRight
                                size={24}
                                className="text-white mb-0.5"
                              />
                              <span className="text-[11px] text-white font-bold">
                                교환
                              </span>
                            </div>
                          </motion.div>
                        ) : (
                          <div className="w-[68px] h-[68px] bg-[#F1F5F9] rounded-[14px] flex items-center justify-center">
                            <div className="flex flex-col items-center">
                              <span className="text-[10px] text-[#94A3B8] font-semibold text-center">
                                포인트
                                <br />
                                부족
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 부족한 포인트 안내 */}
                    {!canExchange && (
                      <div className="mt-3 pt-3 border-t border-[#E2E8F0]">
                        <span className="text-[12px] text-[#EF4444] font-medium">
                          {(
                            option.points - userPoints
                          ).toLocaleString()}
                          P 더 필요합니다
                        </span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* 이용내역 */}
          <div className="px-4 mt-6 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[16px] font-bold text-[#0F172A]">이용내역</h2>
              <button className="text-[12px] text-[#64748B] hover:text-[#2563EB] transition-colors">
                전체보기
              </button>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-[16px] overflow-hidden">
              {MOCK_HISTORY.map((item, index) => {
                const isEarn = item.type === 'earn';
                const Icon = isEarn ? TrendingUp : TrendingDown;
                const pointColor = isEarn ? 'text-[#00C896]' : 'text-[#FF4D6A]';
                const sign = isEarn ? '+' : '-';

                return (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-4 ${
                      index !== MOCK_HISTORY.length - 1 ? 'border-b border-[#F1F5F9]' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center ${
                        isEarn ? 'bg-[#F0FDF4]' : 'bg-[#FFF1F3]'
                      }`}>
                        <Icon size={20} className={pointColor} />
                      </div>
                      <div className="flex-1">
                        <p className="text-[14px] font-semibold text-[#0F172A] mb-0.5">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-1.5">
                          <Clock size={12} className="text-[#94A3B8]" />
                          <span className="text-[12px] text-[#94A3B8]">
                            {item.date}
                          </span>
                          {item.status && (
                            <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded ${
                              item.status === 'completed'
                                ? 'bg-[#F0FDF4] text-[#00C896]'
                                : 'bg-[#FFFBEB] text-[#F59E0B]'
                            }`}>
                              {item.status === 'completed' ? '완료' : '처리중'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={`text-[16px] font-bold font-['DM_Mono'] ${pointColor}`}>
                      {sign}{item.points.toLocaleString()}P
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 하단 안내 */}
          <div className="px-4 mt-6 mb-6">
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] p-4">
              <h3 className="text-[13px] font-bold text-[#0F172A] mb-2">
                포인트 적립 방법
              </h3>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    size={16}
                    className="text-[#00C896] mt-0.5 shrink-0"
                  />
                  <span className="text-[12px] text-[#64748B] leading-relaxed">
                    예측 성공 시{" "}
                    <span className="font-semibold text-[#0F172A]">
                      100P
                    </span>{" "}
                    지급
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    size={16}
                    className="text-[#00C896] mt-0.5 shrink-0"
                  />
                  <span className="text-[12px] text-[#64748B] leading-relaxed">
                    연속 성공 보너스{" "}
                    <span className="font-semibold text-[#0F172A]">
                      최대 500P
                    </span>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    size={16}
                    className="text-[#00C896] mt-0.5 shrink-0"
                  />
                  <span className="text-[12px] text-[#64748B] leading-relaxed">
                    10연승 달성 시{" "}
                    <span className="font-semibold text-[#0F172A]">
                      400,000P
                    </span>{" "}
                    지급
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNav />

        {/* 교환 확인 모달 */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-[rgba(15,23,42,0.5)] flex items-end justify-center z-50">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
              }}
              className="bg-white rounded-t-[24px] w-full max-w-md p-6 pb-8 shadow-[0_-8px_32px_rgba(15,23,42,0.15)]"
            >
              <div className="w-10 h-1 bg-[#E2E8F0] rounded-full mx-auto mb-6" />

              <h3 className="text-[20px] font-bold text-[#0F172A] mb-2">
                교환 확인
              </h3>
              <p className="text-[14px] text-[#64748B] mb-6 leading-relaxed">
                네이버페이로 현금 교환을 진행하시겠습니까?
              </p>

              {getSelectedOptionData() && (
                <div className="bg-[#F8FAFC] rounded-[12px] p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[13px] text-[#64748B]">
                      사용 포인트
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[18px] font-bold text-[#0F172A] font-['DM_Mono']">
                        {getSelectedOptionData()!.points.toLocaleString()}
                      </span>
                      <span className="text-[13px] text-[#64748B] font-semibold">
                        P
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] text-[#64748B]">
                      지급 금액
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[20px] font-extrabold text-[#00C896] font-['DM_Mono']">
                        {getSelectedOptionData()!.cash.toLocaleString()}
                      </span>
                      <span className="text-[13px] text-[#64748B] font-semibold">
                        원
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-[#E2E8F0]">
                    <span className="text-[11px] text-[#94A3B8]">
                      교환 후 잔액:{" "}
                      <span className="font-['DM_Mono'] font-semibold text-[#0F172A]">
                        {(
                          userPoints -
                          getSelectedOptionData()!.points
                        ).toLocaleString()}
                        P
                      </span>
                    </span>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 h-[52px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] text-[#0F172A] text-[15px] font-semibold hover:bg-[#F1F5F9] transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={confirmExchange}
                  className="flex-1 h-[52px] bg-[#2563EB] rounded-[12px] text-white text-[15px] font-bold hover:bg-[#1D4ED8] transition-colors shadow-[0_4px_12px_rgba(37,99,235,0.3)]"
                >
                  교환하기
                </button>
              </div>
            </motion.div>
          </div>
        )}

        <style
          dangerouslySetInnerHTML={{
            __html: `
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `,
          }}
        />
      </div>
    </div>
  );
}