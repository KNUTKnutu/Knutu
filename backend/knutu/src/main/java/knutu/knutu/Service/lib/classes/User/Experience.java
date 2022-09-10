package knutu.knutu.Service.lib.classes.User;

import java.util.ArrayList;

import knutu.knutu.Logic.Fibonacci.Fibonacci;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Experience {
    public static ArrayList<Double> experienceDB = new ArrayList<Double>();

    public static void initExperienceDB() {
        for(int i = 1; i <= 300; i++) {
            experienceDB.add(Fibonacci.getFibonacci(i + 1));
        }
    }

    public static double getTotalExperience(int level) {
        return Fibonacci.getTotalExperience(level);
    }

    public static double getRemainExperience(double currExperience, int level) {
        double requiredTotalExperience = Experience.getTotalExperience(level);
        return requiredTotalExperience - currExperience;
    }
}