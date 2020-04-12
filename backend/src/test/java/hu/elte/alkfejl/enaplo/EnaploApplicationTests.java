package hu.elte.alkfejl.enaplo;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest
public class EnaploApplicationTests {

	@Test
	public void fakeTest() {
		long i = 1;
		assertEquals(1, i);
	}
}