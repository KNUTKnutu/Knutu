package knutu.knutu.Logic.Fibonacci;

public class Fibonacci {
    public static double getFibonacci(int index) {
        if(index == 1 || index == 2) return 1;

        int a1 = 1;
        int a2 = 1;
        int a3 = 2;

        for(int i = 1; i <= index - 2; i++) {
            a3 = a1 + a2;
            a1 = a2;
            a2 = a3;
        }

        return a3;
    }

    // 황여진 TODO: Experience Table을 만들고, 거기에 Hash 필요
    // 황여진 TODO: 직접 Fibonacci를 Brute Force로 10 내지는 20정도까지 구해보고 아래 함수가 참인지 판별 요청.
    public static double getTotalExperience(int level) {
        if(level == 0) return 0;
        if(level == 1) return 1;
        
        return Fibonacci.getFibonacci(level) + Fibonacci.getFibonacci(level - 1);
    }

    // 황여진 TODO: 위의 함수들을 이용하여, 현재 User의 currExperience를 매개변수로 받아 User의 Level을 구하여 int type으로 return하는 아래 메소드 구현.
    public static int getUserLevel(double experience) {
        return 0;   // 여길 지우고 시작
    }
}
