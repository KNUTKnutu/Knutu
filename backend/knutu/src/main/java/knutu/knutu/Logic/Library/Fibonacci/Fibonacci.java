package knutu.knutu.Logic.Library.Fibonacci;

import java.util.HashMap;

public class Fibonacci {
    public static HashMap<Integer, Double> experienceTable = new HashMap<Integer, Double>();
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

    public static double getTotalExperience(int level) {
    	if(experienceTable.containsKey(level)) return experienceTable.get(level);

        if(level == 0) return 0;
        if(level == 1) return 1;
        
        double result = Fibonacci.getFibonacci(level) + Fibonacci.getFibonacci(level - 1);
        experienceTable.put(level, result);

        return result;
    }

    // 황여진 TODO: 위의 함수들을 이용하여, 현재 User의 currExperience를 매개변수로 받아 User의 Level을 구하여 int type으로 return하는 아래 메소드 구현.
    public static int getUserLevel(double experience) {
        return 0;   // 여길 지우고 시작
    }
}
