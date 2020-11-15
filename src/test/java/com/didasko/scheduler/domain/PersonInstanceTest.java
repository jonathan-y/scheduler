package com.didasko.scheduler.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.didasko.scheduler.web.rest.TestUtil;

public class PersonInstanceTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PersonInstance.class);
        PersonInstance personInstance1 = new PersonInstance();
        personInstance1.setId(1L);
        PersonInstance personInstance2 = new PersonInstance();
        personInstance2.setId(personInstance1.getId());
        assertThat(personInstance1).isEqualTo(personInstance2);
        personInstance2.setId(2L);
        assertThat(personInstance1).isNotEqualTo(personInstance2);
        personInstance1.setId(null);
        assertThat(personInstance1).isNotEqualTo(personInstance2);
    }
}
