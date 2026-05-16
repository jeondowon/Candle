#!/bin/bash

# Candle 프로젝트 GitHub 푸시 스크립트
# 사용법: bash push-to-github.sh

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🕯️  Candle → GitHub 푸시 스크립트"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Git 상태 확인
if [ ! -d ".git" ]; then
    echo "❌ Git 저장소가 아닙니다!"
    echo "   candle-app-complete.tar.gz 압축 해제 후 실행하세요."
    exit 1
fi

echo "📊 현재 커밋 정보:"
git log --oneline -1
echo ""

echo "🔗 GitHub 리포지토리:"
git remote -v
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "⚠️  GitHub 인증 방법을 선택하세요:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1️⃣  GitHub Personal Access Token 사용 (추천)"
echo "   - GitHub.com → Settings → Developer settings"
echo "   - Personal access tokens → Generate new token"
echo "   - 'repo' 권한 선택 후 생성"
echo ""
echo "2️⃣  SSH 키 사용"
echo "   - ~/.ssh/id_rsa.pub 등록 필요"
echo ""
echo "3️⃣  GitHub CLI (gh) 사용"
echo "   - gh auth login 먼저 실행"
echo ""

read -p "선택 (1/2/3): " choice

case $choice in
    1)
        echo ""
        read -p "GitHub Personal Access Token 입력: " token
        if [ -z "$token" ]; then
            echo "❌ 토큰이 입력되지 않았습니다."
            exit 1
        fi

        # HTTPS URL을 토큰 포함 URL로 변경
        git remote set-url origin https://${token}@github.com/jeondowon/Candle.git

        echo ""
        echo "🚀 푸시 중..."
        git push -u origin main

        if [ $? -eq 0 ]; then
            echo ""
            echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
            echo "✅ GitHub에 성공적으로 푸시되었습니다!"
            echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
            echo ""
            echo "🔗 리포지토리 확인: https://github.com/jeondowon/Candle"
            echo ""
        else
            echo ""
            echo "❌ 푸시 실패! 에러 메시지를 확인하세요."
            exit 1
        fi
        ;;

    2)
        # SSH로 변경
        git remote set-url origin git@github.com:jeondowon/Candle.git

        echo ""
        echo "🚀 푸시 중..."
        git push -u origin main

        if [ $? -eq 0 ]; then
            echo ""
            echo "✅ 푸시 완료!"
            echo "🔗 https://github.com/jeondowon/Candle"
        else
            echo "❌ SSH 키가 등록되지 않았거나 권한이 없습니다."
            exit 1
        fi
        ;;

    3)
        echo ""
        echo "🚀 GitHub CLI로 푸시 중..."
        gh repo sync

        if [ $? -eq 0 ]; then
            echo "✅ 푸시 완료!"
        else
            echo "❌ gh auth login을 먼저 실행하세요."
            exit 1
        fi
        ;;

    *)
        echo "❌ 잘못된 선택입니다."
        exit 1
        ;;
esac
